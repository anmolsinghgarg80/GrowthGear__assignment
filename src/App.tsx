import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch, useSelector } from "react-redux";
import { ChartDataType, RootState } from "./types";
import AiSuggestionSection from "./components/AiSuggestionSection";
import SearchHistorySection from "./components/SearchHistorySection";
import SearchSection from "./components/SearchSection";
import ResultSection from "./components/ResultSection";
import {
  setQuestion,
  setOutput,
  setChartData,
  setAiRecommendations,
  setIsLoading,
  setSearchHistory,
} from "./features/dashboardSlice";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GenAIAnalyticsDashboard = () => {
  const { question, searchHistory } = useSelector(
    (state: RootState) => state.dashboard
  );

  const dispatch = useDispatch();

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Handle query submission with Gemini processing
  const handleGeminiQuery = async (queryOverride?: string) => {
    const queryToUse = queryOverride || question;

    if (!queryToUse.trim()) return;
    dispatch(setIsLoading(true));

    try {
      // Generate natural language insights
      const responsePrompt = `Provide a short 200 words professional analysis for the question: ${queryToUse}`;
      const responseResult = await model.generateContent(responsePrompt);
      const textResponse = await responseResult.response.text();

      // Generate JSON data for chart
      const jsonPrompt = `Create a JSON array of sales/performance data related to this question: ${queryToUse}. Provide an array of objects with 'year' and 'profit' keys. Only return valid JSON. Example: [{ "year": "2022", "profit": 4000 }, { "year": "2023", "profit": 4500 }]`;
      const jsonResult = await model.generateContent(jsonPrompt);
      const jsonResponseText = await jsonResult.response.text();
      const parsedData = extractJSON(jsonResponseText);

      // Instruct Gemini to return a JSON array of suggestions
      const recommendationPrompt = `Return a JSON array of three questions similar to: "${queryToUse}". Ensure the array contains complete, relevant questions.`;
      const recommendationResult = await model.generateContent(
        recommendationPrompt
      );
      const recommendationsResponseText =
        await recommendationResult.response.text();
      const suggestionsArray = extractSuggestions(recommendationsResponseText);

      // Update state values
      dispatch(setAiRecommendations(suggestionsArray));
      dispatch(setOutput(textResponse));
      dispatch(setChartData(parsedData));
      dispatch(setIsLoading(false));
      const updatedSearchHistory = [...searchHistory, queryToUse].slice(-5); // Keep last 5 searches
      dispatch(setSearchHistory(updatedSearchHistory));
    } catch (error) {
      console.error("Error processing AI response:", error);
      dispatch(
        setChartData([
          { year: "2022", profit: 500 },
          { year: "2023", profit: 750 },
          { year: "2024", profit: 1000 },
        ])
      );
      dispatch(
        setOutput(
          "Unable to generate specific insights. Showing estimated data."
        )
      );
      dispatch(setIsLoading(false));
    }
  };

  // Extract JSON helper function with fallback data
  const extractJSON = (text: string): ChartDataType[] => {
    try {
      // Remove code block markers and trim
      const cleanText = text.replace(/```(json)?/g, "").trim();

      // Try to parse the clean text
      const parsedData = JSON.parse(cleanText);

      // Validate the parsed data
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("Invalid data format");
      }

      return parsedData;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return [
        { year: "2022", profit: 500 },
        { year: "2023", profit: 750 },
        { year: "2024", profit: 1000 },
      ];
    }
  };

  // Extract suggestions helper function
  const extractSuggestions = (text: string): string[] => {
    try {
      // Remove code block markers and trim
      const cleanText = text.replace(/```(json)?/g, "").trim();

      // Try to parse the clean text
      const parsedSuggestions = JSON.parse(cleanText);

      // Validate the parsed suggestions
      if (!Array.isArray(parsedSuggestions) || parsedSuggestions.length === 0) {
        throw new Error("Invalid suggestions format");
      }

      // Ensure all suggestions are strings
      return parsedSuggestions
        .slice(0, 3)
        .map((suggestion) =>
          typeof suggestion === "string"
            ? suggestion
            : JSON.stringify(suggestion)
        );
    } catch (error) {
      console.error("Suggestions parsing error:", error);
      return [];
    }
  };

  // Click handler for suggestion: autofill query and update recommendations
  const handleRecommendationClick = (rec: string) => {
    dispatch(setQuestion(rec));
    // Trigger AI query when a get analysis is clicked
    handleGeminiQuery(rec);
  };

  return (
    <div className="min-h-screen bg-[#10172a] text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <SearchSection handleGeminiQuery={handleGeminiQuery} />

        <AiSuggestionSection
          handleRecommendationClick={handleRecommendationClick}
        />

        <SearchHistorySection
          handleRecommendationClick={handleRecommendationClick}
        />

        <ResultSection />
      </div>
    </div>
  );
};

export default GenAIAnalyticsDashboard;
