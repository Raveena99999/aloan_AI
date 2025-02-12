import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/stocks";

// Fetch stock list
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

// Fetch stock data (updates dynamically)
export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ stockId, duration }) => {
    const response = await axios.post(`${BASE_URL}/${stockId}`, { duration });
    return { stockId, duration, data: response.data };
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: { stocks: [], stockData: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.stockData[action.payload.stockId] = action.payload.data;
      });
  },
});

export default stocksSlice.reducer;
