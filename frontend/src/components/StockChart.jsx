// import { Line } from "react-chartjs-2";

// const StockChart = ({ stockData }) => {
//   if (!stockData || stockData.length === 0) return <p>Loading...</p>;

//   const data = {
//     labels: stockData.map((point) => point.timestamp),
//     datasets: [
//       {
//         label: "Stock Price",
//         data: stockData.map((point) => point.price),
//         borderColor: "blue",
//         fill: false,
//       },
//     ],
//   };

//   return <Line data={data} />;
// };

// export default StockChart;


import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Select, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Select, Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stocks = ["AAPL", "GOOGL", "AMZN", "MSFT"];
const durations = ["1D", "1W", "1M", "1Y"];

const StockChart = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [duration, setDuration] = useState("1W");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!selectedStock || !duration) return; // Ensure values are selected before fetching
  
      setLoading(true);
      setError(null);
      try {
        // const response = await fetch(`/api/stocks?symbol=${selectedStock}&duration=${duration}`);
                const response = await fetch(`http://localhost:3000/api/stocksgit `);

        if (!response.ok) throw new Error("Failed to fetch stock data");
        const data = await response.json();
        setStockData(data);
      } catch (err) {
        setError("Failed to fetch stock data");
        console.error(err.message);
      }
      setLoading(false);
    };
  
    fetchStockData();
  }, [selectedStock, duration]);
  
  const chartData = {
    labels: stockData?.map((point) => point.time) || [],
    datasets: [
      {
        label: `${selectedStock} Stock Price`,
        data: stockData?.map((point) => point.price) || [],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between mb-4">
        <Select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
          {stocks.map((stock) => (
            <option key={stock} value={stock}>{stock}</option>
          ))}
        </Select>
        <div>
          {durations.map((d) => (
            <Button key={d} onClick={() => setDuration(d)} className={d === duration ? "bg-blue-500 text-white" : "bg-gray-200"}>
              {d}
            </Button>
          ))}
        </div>
      </div>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <Line data={chartData} />} 
    </div>
  );
};

export default StockChart;
