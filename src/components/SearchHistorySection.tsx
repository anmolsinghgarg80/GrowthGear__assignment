import { useSelector } from "react-redux";
import { RootState } from "../types";

type props = {
  handleRecommendationClick: (history: string) => void;
};

const SearchHistorySection = ({ handleRecommendationClick }: props) => {
  const { searchHistory } = useSelector((state: RootState) => state.dashboard);

  return (
    <>
      {searchHistory.length > 0 ? (
        <div className="mb-4 bg-[#1e293b] p-2 rounded-xl px-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">
            Older History
          </h3>
          <div className="grid grid-cols-1">
            {searchHistory.map((history, index) => (
              <button
                key={index}
                onClick={() => handleRecommendationClick(history)}
                className="bg-[#1e293b] px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-left break-words"
              >
                {index + 1}. {history}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-[#1e293b] p-2 rounded-xl px-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">
            You have no Search history
          </h3>
        </div>
      )}
    </>
  );
};

export default SearchHistorySection;
