const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors()); // Enabling CORS
app.use(express.json()); // parse JSON requests

app.get("/", (req, res) => {
    res.send("Stock Tracker Backend is running!");
});

// Stock API Routes
const stockRoutes = require("./routes/stockRoutes");
app.use("/api/stocks", stockRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
// const favoritesRoute = require("./routes/favorites");
// app.use("/api/favorites", favoritesRoute);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});