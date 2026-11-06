const app = require("../server");
const { connectDB } = require("../config/db");

// Reuse the connection across warm serverless invocations.
let dbConnection;

module.exports = async (req, res) => {
  try {
    if (!dbConnection) {
      dbConnection = connectDB();
    }

    await dbConnection;

    return app(req, res);
  } catch (error) {
    // Allow the next invocation to retry the connection.
    dbConnection = undefined;

    console.error("Serverless request failed:", error.message);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
};
