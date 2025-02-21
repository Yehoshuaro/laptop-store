const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, "supersecret");
        req.user = decoded;
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
