import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./features/stocksSlice";

const store = configureStore({
  reducer: { stocks: stocksReducer },
});

export default store;
