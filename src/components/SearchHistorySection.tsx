import { useSelector } from "react-redux";
import { RootState } from "../types";
import { ChevronRight, History } from "lucide-react";

type Props = {
  handleRecommendationClick: (history: string) => void;
};

const SearchHistorySection = ({ handleRecommendationClick }: Props) => {
  const { searchHistory } = useSelector((state: RootState) => state.dashboard);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <History className="text-teal-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Search History</h3>
      </div>
      <div className="space-y-3">
        {searchHistory.length > 0 ? (
          searchHistory.map((history, index) => (
            <button
              key={index}
              onClick={() => handleRecommendationClick(history)}
              className="w-full text-left bg-gray-100 hover:bg-blue-100 p-3 rounded-lg transition-colors flex justify-between items-center group"
            >
              <span className="text-gray-700"># {history}</span>
              <ChevronRight
                className="text-gray-400 group-hover:text-blue-600 transition-colors"
                size={20}
              />
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-center">No recent searches</p>
        )}
      </div>
    </div>
  );
};

export default SearchHistorySection;
