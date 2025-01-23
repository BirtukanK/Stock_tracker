const axios = require("axios");
const redisClient = require("../cache/redisClient");
const logger = require("../logger");

const CACHE_EXPIRATION = 60; // Cache duration in seconds

async function fetchStockData(symbol) {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    const cachedData = await redisClient.get(symbol);
    if (cachedData) {
        console.log(`Cache hit for ${symbol}`);
        return JSON.parse(cachedData);
    }

    try {
        console.log(`Cache miss for ${symbol}, fetching from API...`);
        const response = await axios.get(url);
        const data = response.data;

        if (data["Error Message"]) {
            throw new Error("Invalid stock symbol.");
        }

        const processedData = {
            meta: data["Meta Data"],
            timeSeries: data["Time Series (1min)"],
        };

        // Save to Redis cache
        await redisClient.set(symbol, JSON.stringify(processedData), "EX", CACHE_EXPIRATION);

        return processedData;
    } catch (error) {
        logger.error(`Error fetching data for ${symbol}: ${error.message}`);
        throw new Error("Error fetching stock data.");
    }
}

module.exports = { fetchStockData };