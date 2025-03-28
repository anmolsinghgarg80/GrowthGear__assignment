import { useSelector } from "react-redux";
import { RootState } from "../types";

type Props = {
  handleRecommendationClick: (history: string) => void;
};

const SearchHistorySection = ({ handleRecommendationClick }: Props) => {
  const { searchHistory } = useSelector((state: RootState) => state.dashboard);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {searchHistory.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Search History
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {searchHistory.map((history, index) => (
              <button
                key={index}
                onClick={() => handleRecommendationClick(history)}
                className="bg-gray-200 hover:bg-blue-100 text-gray-800 px-4 py-2 rounded-lg transition-colors text-left break-words"
              >
                # {history}
              </button>
            ))}
          </div>
        </>
      ) : (
        <h3 className="text-lg font-semibold text-blue-600">
          No Search History
        </h3>
      )}
    </div>
  );
};

export default SearchHistorySection;
