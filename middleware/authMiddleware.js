const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // Extract actual token
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();  // ✅ Ensure next() is called
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    
    next();  // ✅ Ensure next() is called
};

module.exports = { authMiddleware, adminMiddleware };
