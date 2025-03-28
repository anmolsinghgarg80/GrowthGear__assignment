import { useSelector } from "react-redux";
import { RootState } from "../types";

type props ={
  handleRecommendationClick: (recommendation : string) => void;
}

const AiSuggestionSection = ({handleRecommendationClick}:props) => {
  const {
    aiRecommendations,
  } = useSelector((state: RootState) => state.dashboard);
  return (
    <>
    {aiRecommendations.length > 0 && (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">
          Suggested Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {aiRecommendations.map((recommendation, index) => (
            <button
              key={index}
              onClick={() => handleRecommendationClick(recommendation)}
              className="bg-[#1e293b] px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-left break-words"
            >
              {recommendation}
            </button>
          ))}
        </div>
      </div>
    )}
    </>
  )
}

export default AiSuggestionSection