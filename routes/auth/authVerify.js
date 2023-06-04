const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Variables
    const token = req.header("auth-token");

    // Verify if the user has token
    if (!token) return res.status(401).send("Access Denied.");

    // Verify token
    try {
        // Is OK :)
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        // Status: invalid token
        return res.status(400).send("Invalid token.");
    }
};
