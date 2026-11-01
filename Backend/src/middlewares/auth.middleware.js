const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided. Please login."
            });
        }

        const isTokenBlacklisted = await tokenBlacklistModel.findOne({
            token
        });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid. Please login again."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        console.error("Authentication error:", err.message);

        return res.status(401).json({
            message: "Authentication failed. Please login again."
        });
    }
}

module.exports = { authUser };