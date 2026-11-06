const { jwtVerify, createRemoteJWKSet, decodeJwt } = require("jose");
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

let jwks;
let authUrl;

// Build the JWKS client lazily so a missing BETTER_AUTH_URL cannot crash the
// whole serverless function at import time.
const getAuthConfig = () => {
  if (!authUrl) {
    authUrl = (process.env.BETTER_AUTH_URL || "").replace(/\/+$/, "");
  }

  if (!authUrl) {
    throw new Error("BETTER_AUTH_URL is not configured");
  }

  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${authUrl}/api/auth/jwks`));
  }

  return { jwks, authUrl };
};

const verifyToken = async (req, res, next) => {
  try {
    const { jwks: keySet, authUrl: audience } = getAuthConfig();

    console.log("Authorization header:", !!req.headers.authorization);
    console.log(
      "Bearer token exists:",
      req.headers.authorization?.startsWith("Bearer ")
    );

    // Read token from Authorization header
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.studio_access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is missing",
      });
    }

    const decoded = decodeJwt(token);

    console.log("JWT issuer:", decoded.iss);
    console.log("JWT audience:", decoded.aud);
    console.log("Expected AUTH_URL:", audience);

    const { payload } = await jwtVerify(token, keySet, {
      audience,
    });

    if (!payload.sub) {
      return res.status(401).json({
        success: false,
        message: "Invalid token: User ID is missing",
      });
    }

    const db = getDB();

    let user = null;

    if (ObjectId.isValid(payload.sub)) {
      user = await db.collection("user").findOne({
        _id: new ObjectId(payload.sub),
      });
    }

    if (!user) {
      user = await db.collection("user").findOne({
        id: payload.sub,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user._id?.toString() || user.id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
      permissions: user.permissions || {},
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", {
      name: error.name,
      code: error.code,
      message: error.message,
    });

    if (error.message === "BETTER_AUTH_URL is not configured") {
      return res.status(500).json({
        success: false,
        message: "Auth server is not configured",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports = verifyToken;
