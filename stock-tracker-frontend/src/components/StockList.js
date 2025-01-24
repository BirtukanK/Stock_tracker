import React from "react";

const StockList = ({ stocks, onSelect }) => (
    <ul>
        {stocks.map((stock) => (
            <li key={stock} onClick={() => onSelect(stock)}>
                {stock}
            </li>
        ))}
    </ul>
);

export default StockList;
