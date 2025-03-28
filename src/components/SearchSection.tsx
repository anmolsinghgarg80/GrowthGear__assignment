import { useSelector } from "react-redux";
import { RootState } from "../types";
import { useDispatch } from "react-redux";
import {
  setQuestion,
} from "../features/dashboardSlice";

type props = {
  handleGeminiQuery : () => void;
}

const SearchSection = ({ handleGeminiQuery }: props) => {
  const {
    question,
    isLoading,
  } = useSelector((state: RootState) => state.dashboard);

  const dispatch = useDispatch();

  return (
    <>
    <div className="bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden mb-6 relative">
              <div className="flex items-center space-x-3 p-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => {
                    dispatch(setQuestion(e.target.value));
                  }}
                  placeholder="Ask a business intelligence question..."
                  className="flex-grow bg-[#0f172a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleGeminiQuery()}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Analyzing..." : "Generate Insights"}
                </button>
              </div>
            </div>
    </>
  )
}

export default SearchSection