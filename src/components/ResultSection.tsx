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
  const { output, chartData, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );

  // Determine the key for x-axis dynamically
  const xAxisKey = chartData.length > 0 ? Object.keys(chartData[0])[0] : "year";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          AI Insights
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">
            {output || "Your AI-generated insights will appear here..."}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Data Visualization
        </h2>
        <ResponsiveContainer width="95%" height={300} className="my-4">
          <LineChart
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
            data={
              chartData.length > 0
                ? chartData
                : [
                    { months: "Jan", profit: 500 },
                    { months: "Feb", profit: 750 },
                    { months: "Mar", profit: 1000 },
                  ]
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey={xAxisKey} stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#edf2f7",
                border: "none",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#2d3748" }}
              labelStyle={{ color: "#2d3748" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#3182ce"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultSection;
