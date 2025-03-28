import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: "",
  output: "",
  aiRecommendations: [
    "Sales performance of Amazon in USA",
    "Top 10 products this quarter",
    "Total Profit of IT companies since 2020",
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
