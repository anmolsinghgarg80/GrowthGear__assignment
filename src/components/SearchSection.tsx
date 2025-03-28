import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types";
import { setQuestion } from "../features/dashboardSlice";
import { Search } from "lucide-react";

type Props = {
  handleGeminiQuery: () => void;
};

const SearchSection = ({ handleGeminiQuery }: Props) => {
  const { question, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Search className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">
          Ask Your Business Intelligence Question
        </h2>
      </div>
      <div className="flex">
        <input
          type="text"
          value={question}
          onChange={(e) => dispatch(setQuestion(e.target.value))}
          placeholder="What insights do you need today?"
          className="flex-grow border-2 border-blue-200 rounded-l-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={handleGeminiQuery}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-r-xl hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isLoading ? "Analyzing..." : "Generate Insights"}
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
