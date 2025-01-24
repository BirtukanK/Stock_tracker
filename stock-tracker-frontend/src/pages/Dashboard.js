import React, { useState } from "react";
import StockSearch from "../components/StockSearch";
import StockChart from "../components/StockChart";
import { fetchStockData } from "../api";

const Dashboard = () => {
    const [stockData, SetStockData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (symbol) => {
        setError(null);
        SetStockData(null);

        try {
            const data = await fetchStockData(symbol);
            SetStockData(data.timeSeries);
        } catch (err) {
            setError("Failed to fetch stock data.")
        }
    };

    return (
        <div className="dashboard">
            <h1>Stock Tracker</h1>
            <StockSearch onSearch={handleSearch}/>
            {error && <p className="error">{error}</p>}
            {stockData ? <StockChart data={stockData}/> : <p>Search for a stock to view data.</p>}
   
        </div>
    );   
};

export default Dashboard;