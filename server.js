
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { connectDB } = require("./config/db");
const studioRoutes = require("./routes/studioRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Server Health Check
// These run before the database middleware so you can verify the function is
// alive even when MongoDB is unreachable or not configured.
app.get("/", (req, res) => {
  res.send("StudioSpace Server is running!");
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "StudioSpace Server is running!" });
});

// Connect to MongoDB before handling API routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// API Routes
app.use("/api/studios", studioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Request failed:", error.message);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`StudioSpace Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

// On Vercel the app is imported by api/index.js, so only listen when run directly.
if (require.main === module) {
  startServer();
}

module.exports = app;

