import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'; 
Chart.register(...registerables);

const StockChart = ({ data }) => {
    if (!data) {
        return <p>No data available</p>;
    }

    const labels = Object.keys(data).reverse();
    const prices = labels.map((label) => parseFloat(data[label]["4. close"]));

    const chartData = {
        labels,
        datasets: [
            {
                label: "Stock Price (Close)",
                data: prices,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    return <Line data={chartData}/>
};

export default StockChart;