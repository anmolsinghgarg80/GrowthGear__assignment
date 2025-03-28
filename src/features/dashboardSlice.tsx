import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: "",
  output: "",
  aiRecommendations: [
    "Sales performance by region",
    "Top 10 products this quarter",
    "Customer retention rates",
  ] as string[],
  chartData: [],
  isLoading: false,
  searchHistory: [] as string[],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setAiRecommendations: (state, action) => {
      state.aiRecommendations = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearchHistory: (state, action) => {
      state.searchHistory = action.payload;
    },
  },
});

export const {
  setQuestion,
  setOutput,
  setAiRecommendations,
  setChartData,
  setIsLoading,
  setSearchHistory,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
