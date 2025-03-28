import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RootState } from "../types";
import { useSelector } from "react-redux";

const ResultSection = () => {

  const {
    output,
    chartData,
    isLoading,
  } = useSelector((state: RootState) => state.dashboard);
   
  return (
    <>
    <div className="grid grid-cols-1 gap-6">
          {/* AI Insights Text */}
          <div className="bg-[#1e293b] rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              AI Insights
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
              </div>
            ) : (
              <p className="text-gray-300 leading-relaxed">
                {output || "Your AI-generated insights will appear here..."}
              </p>
            )}
          </div>

          {/* Chart Visualization */}
          <div className="bg-[#1e293b] rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              Data Visualization
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  chartData.length > 0
                    ? chartData
                    : [
                        { year: "2022", profit: 500 },
                        { year: "2023", profit: 750 },
                        { year: "2024", profit: 1000 },
                      ]
                }
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                  itemStyle={{ color: "white" }}
                  labelStyle={{ color: "white" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </>
  )
}

export default ResultSection