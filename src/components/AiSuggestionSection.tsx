import { useSelector } from "react-redux";
import { RootState } from "../types";

type Props = {
  handleRecommendationClick: (recommendation: string) => void;
};

const AiSuggestionSection = ({ handleRecommendationClick }: Props) => {
  const { aiRecommendations } = useSelector((state: RootState) => state.dashboard);

  if (aiRecommendations.length === 0) return null;
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-blue-600 mb-2">Suggested Questions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {aiRecommendations.map((recommendation, index) => (
          <button
            key={index}
            onClick={() => handleRecommendationClick(recommendation)}
            className="bg-gray-200 hover:bg-blue-100 text-gray-800 px-4 py-2 rounded-lg transition-colors text-left break-words"
          >
            {recommendation}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AiSuggestionSection;
