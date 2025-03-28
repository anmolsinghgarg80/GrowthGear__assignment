import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types";
import { setQuestion } from "../features/dashboardSlice";

type Props = {
  handleGeminiQuery: () => void;
};

const SearchSection = ({ handleGeminiQuery }: Props) => {
  const { question, isLoading } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex">
        <input
          type="text"
          value={question}
          onChange={(e) => dispatch(setQuestion(e.target.value))}
          placeholder="Ask a business intelligence question..."
          className="flex-grow border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleGeminiQuery()}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Analyzing..." : "Generate Insights"}
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
