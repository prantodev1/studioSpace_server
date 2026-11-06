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

const client = new MongoClient(process.env.MONGODB_URI);

let db;

const connectDB = async () => {
  try {
    await client.connect();

    db = client.db("studioSpaceDB");

    console.log("MongoDB connected successfully!");

    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database is not connected yet!");
  }

  return db;
};

module.exports = { connectDB, getDB };
