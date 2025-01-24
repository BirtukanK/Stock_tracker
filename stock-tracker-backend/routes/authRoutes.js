const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("winston");
const authenticateToken = require("../middleware/authMiddleware");


const router = express.Router();

const users = [];

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Registration endpoint
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    // check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully." });
});

// Login endpoint
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ error: "Invalid credentials." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

    router.get("/protected", authenticateToken, (req, res) => {
        res.json({ message: "You have access to this protected route." });
    });
});

module.exports = router;
