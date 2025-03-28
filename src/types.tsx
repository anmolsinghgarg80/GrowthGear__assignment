export type RootState = {
  dashboard: {
    question: string;
    output: string;
    aiRecommendations: string[];
    chartData: ChartDataType[];
    isLoading: boolean;
    searchHistory: string[];
  };
};

export type ChartDataType = {
  year: string;
  profit: number;
};