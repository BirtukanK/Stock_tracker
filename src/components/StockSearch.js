import React, { useState } from "react";

const StockSearch = ({ onSearch }) => {
    const [symbol, setSymbol] = useState("");

    const handleSearch = () => {
        if (symbol.trim()) {
            onSearch(symbol.trim().toUpperCase());
        }
    };

    return (
        <div className="stock-search">
            <input
                type="text"
                placeholder="Enter Stock Symbol (e.g., AAPL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default StockSearch;
