import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchStockData = async (symbol) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stocks`, {
            params: { symbol },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};
