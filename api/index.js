// Vercel serverless entry point.
// The Express app connects to MongoDB per request (cached) via middleware in
// server.js, and only starts an HTTP listener when run locally.
module.exports = require("../server");
