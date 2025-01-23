const express = require("express");
const { fetchStockData } = require("../services/stockService");
const { error } = require("console");

const router = express.Router();

// Route to get stock data
router.get("/", async (req, res) => {
    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: "Stock symbol is required." });
    }

    try {
        const stockData = await fetchStockData(symbol);
        res.json(stockData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

module.exports = router;