import { useDispatch, useSelector } from "react-redux";
import SearchSection from "./components/SearchSection";
import AiSuggestionSection from "./components/AiSuggestionSection";
import SearchHistorySection from "./components/SearchHistorySection";
import ResultSection from "./components/ResultSection";
import {
  setQuestion,
  setOutput,
  setChartData,
  setAiRecommendations,
  setIsLoading,
  setSearchHistory,
} from "./features/dashboardSlice";
import { BarChart2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RootState } from "./types";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GenAIAnalyticsDashboard = () => {
  const { question, searchHistory } = useSelector(
    (state: RootState) => state.dashboard
  );

  const dispatch = useDispatch();
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const handleGeminiQuery = async (queryOverride?: string) => {
    const queryToUse = queryOverride || question || "";
    if (!queryToUse) return;
    dispatch(setIsLoading(true));

    try {
      // Generate natural language insights
      const responsePrompt = `Provide a short 130 words professional answer for the question: ${queryToUse}`;
      const responseResult = await model.generateContent(responsePrompt);
      const textResponse = responseResult.response.text();

      // Generate JSON data for chart (supporting year, months, or days)
      const jsonPrompt = `Create a JSON array of sales/performance data related to this question: ${queryToUse}. Provide an array of objects with a time period key (it can be 'year', 'months', or 'days') and a 'profit' key. Only return valid JSON. Example1: [{ "year": "2022", "profit": 4000 }, { "year": "2023", "profit": 4500 }] Example2: [{ "month": "jan", "profit": 4000 }, { "month": "feb", "profit": 4500 }]`;
      const jsonResult = await model.generateContent(jsonPrompt);
      const jsonResponseText = jsonResult.response.text();
      const parsedData = extractJSON(jsonResponseText);
      console.log(parsedData);

      // Generate AI recommendations
      const recommendationPrompt = `Return a JSON array of three questions similar to: "${queryToUse}". Ensure the array contains complete, relevant questions.`;
      const recommendationResult = await model.generateContent(
        recommendationPrompt
      );
      const recommendationsResponseText = recommendationResult.response.text();
      const suggestionsArray = extractSuggestions(recommendationsResponseText);

      // Update state
      dispatch(setAiRecommendations(suggestionsArray));
      dispatch(setOutput(textResponse));
      dispatch(setChartData(parsedData));
      dispatch(setIsLoading(false));
      const updatedSearchHistory = [...searchHistory, queryToUse].slice(-5);
      dispatch(setSearchHistory(updatedSearchHistory));
    } catch (error) {
      console.error("Error processing AI response:", error);
      dispatch(
        setChartData([
          { timePeriod: "2022", profit: 500 },
          { timePeriod: "2023", profit: 750 },
          { timePeriod: "2024", profit: 1000 },
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

  // Helper to extract and normalize JSON data
  const extractJSON = (text: string) => {
    try {
      const cleanText = text.replace(/```(json)?/g, "").trim();
      const parsedData = JSON.parse(cleanText);
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("Invalid data format");
      }

      const normalizedData = parsedData.map((item) => {
        const keys = Object.keys(item);

        const timeKey =
          keys.find((key) => key.toLowerCase() !== "profit") || "timePeriod";
        return {
          timePeriod: item[timeKey],
          profit: item["profit"] || item["Profit"] || 0,
        };
      });
      return normalizedData;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return [
        { timePeriod: "2022", profit: 500 },
        { timePeriod: "2023", profit: 750 },
        { timePeriod: "2024", profit: 1000 },
      ];
    }
  };

  // Helper to extract suggestions
  const extractSuggestions = (text: string) => {
    try {
      const cleanText = text.replace(/```(json)?/g, "").trim();
      const parsedSuggestions = JSON.parse(cleanText);
      if (!Array.isArray(parsedSuggestions) || parsedSuggestions.length === 0) {
        throw new Error("Invalid suggestions format");
      }
      return parsedSuggestions.slice(0, 3).map((suggestion) => {
        if (
          typeof suggestion === "object" &&
          (suggestion.question || suggestion.text)
        ) {
          return suggestion.question || suggestion.text;
        }

        if (typeof suggestion === "string") {
          return suggestion;
        }

        return String(suggestion);
      });
    } catch (error) {
      console.error("Suggestions parsing error:", error);
      return [];
    }
  };

  const handleRecommendationClick = (rec: string) => {
    dispatch(setQuestion(rec));
    handleGeminiQuery(rec);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      {/* header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <BarChart2 className="text-blue-600" size={32} />
            <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Data Query Dashboard
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SearchSection handleGeminiQuery={handleGeminiQuery} />
          <AiSuggestionSection
            handleRecommendationClick={handleRecommendationClick}
          />
          <SearchHistorySection
            handleRecommendationClick={handleRecommendationClick}
          />
        </div>
        <div className="space-y-6">
          <ResultSection />
        </div>
      </main>

      {/* footer */}
      <footer className="bg-white shadow py-4 bottom-0">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 Data Query Dashboard Prototype. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GenAIAnalyticsDashboard;
