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
import { BarChart2, Lightbulb } from "lucide-react";
import { RootState } from "../types";
import { useSelector } from "react-redux";

const ResultSection = () => {
  const { output, chartData, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Lightbulb className="text-yellow-500" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            AI-Powered Insights
          </h2>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
            {output || "Your intelligent insights will appear here..."}
          </p>
        )}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <BarChart2 className="text-green-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            Data Visualization
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={300} className="ml-5">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="timePeriod" stroke="#718096" />
            <YAxis
              dataKey="profit"
              stroke="#718096"
              tickFormatter={(value) =>
                value >= 1000000 || value < 1000000
                  ? `${value / 1000000}M`
                  : `${value}`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f0f4f8",
                borderRadius: "0.75rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#3182ce"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ResultSection;
