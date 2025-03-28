import { useSelector } from "react-redux";
import { RootState } from "../types";
import { ChevronRight, Lightbulb } from "lucide-react";

type Props = {
  handleRecommendationClick: (recommendation: string) => void;
};

const AiSuggestionSection = ({ handleRecommendationClick }: Props) => {
  const { aiRecommendations } = useSelector((state: RootState) => state.dashboard);

  if (aiRecommendations.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Lightbulb className="text-purple-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                AI Suggested Questions
              </h3>
            </div>
            <div className="space-y-3">
              {aiRecommendations.map((rec, index) => (
                <button
                  key={index}
                  onClick={() => handleRecommendationClick(rec)}
                  className="w-full text-left bg-gray-100 hover:bg-blue-100 p-3 rounded-lg transition-colors flex justify-between items-center group"
                >
                  <span className="text-gray-700">{rec}</span>
                  <ChevronRight 
                    className="text-gray-400 group-hover:text-blue-600 transition-colors" 
                    size={20} 
                  />
                </button>
              ))}
            </div>
          </div>
  );
};

export default AiSuggestionSection;
