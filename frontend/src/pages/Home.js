import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockData } from "../features/stocksSlice";
import Dropdown from "../components/Dropdown";
import StockChart from "../components/StockChart";

const Home = () => {
  const dispatch = useDispatch();
  const { stocks, stockData } = useSelector((state) => state.stocks);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("1d");

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStock) {
      const interval = setInterval(() => {
        dispatch(fetchStockData({ stockId: selectedStock, duration: selectedDuration }));
      }, 2000); // Fetch new data every 2s
      return () => clearInterval(interval);
    }
  }, [selectedStock, selectedDuration, dispatch]);

  return (
    <div>
      <Dropdown
        label="Select Stock"
        options={stocks}
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      />
      <Dropdown
        label="Select Duration"
        options={[{ id: "1d", name: "1 Day" }, { id: "1w", name: "1 Week" }]}
        value={selectedDuration}
        onChange={(e) => setSelectedDuration(e.target.value)}
      />
      <StockChart stockData={stockData[selectedStock]} />
    </div>
  );
};

export default Home;
