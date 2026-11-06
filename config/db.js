const dns = require("dns");
const { MongoClient } = require("mongodb");

// Node's bundled c-ares reads an empty DNS config on this Windows setup and
// falls back to 127.0.0.1, which breaks mongodb+srv:// SRV lookups
// (querySrv ECONNREFUSED). Use the DNS servers from .env when provided.
const dnsServers = (process.env.DNS_SERVERS || "")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

let client;
let db;
let connection;

// Create the client lazily so a missing MONGODB_URI cannot crash the whole
// serverless function at import time.
const getClient = () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not configured. Add it to your environment variables."
    );
  }

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  return client;
};

const connectDB = async () => {
  if (db) {
    return db;
  }

  if (!connection) {
    connection = (async () => {
      try {
        await getClient().connect();

        db = client.db("studioSpaceDB");

        console.log("MongoDB connected successfully!");

        return db;
      } catch (error) {
        // Allow the next request to retry the connection.
        connection = undefined;
        client = undefined;

        console.error("MongoDB connection failed:", error.message);
        throw error;
      }
    })();
  }

  return connection;
};

const getDB = () => {
  if (!db) {
    throw new Error("Database is not connected yet!");
  }

  return db;
};

module.exports = { connectDB, getDB };
