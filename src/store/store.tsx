import { configureStore } from "@reduxjs/toolkit";
import dashboard from "../features/dashboardSlice";

const store = configureStore({
  reducer: {
    dashboard,
  },
});

export default store;
