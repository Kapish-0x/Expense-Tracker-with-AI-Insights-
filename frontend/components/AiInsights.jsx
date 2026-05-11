import React, { useEffect, useState } from "react";
import axios from "axios";

function AiInsights() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAdvice() {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:4000/expense-api/ai-insights",
          {
            withCredentials: true,
          },
        );

        console.log("AI RESPONSE:", response.data);

        setAdvice(response.data.payload);
      } catch (err) {
        console.log("AI FETCH ERROR:", err);

        setAdvice({
          summary: "Unable to generate AI insights currently.",
          riskLevel: "MEDIUM",
          futureOutlook: "Future expense trend could not be analyzed.",
          tips: [
            "Track expenses consistently",
            "Reduce unnecessary spending",
            "Maintain a fixed monthly savings goal",
          ],
          predictedExpense: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Generating AI Insights
          </h2>

          <p className="text-gray-500 mt-2">
            Analyzing spending patterns and predicting future trends...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-10 text-black">
      <h1 className="text-5xl font-bold mb-8">AI Analysis</h1>

      {advice && (
        <div className="border rounded-3xl p-8 flex flex-col gap-8 bg-white shadow">
          {/* SUMMARY */}
          <div>
            <h2 className="font-bold text-xl mb-3">Financial Summary</h2>

            <p className="text-gray-700 leading-relaxed">{advice.summary}</p>
          </div>

          {/* RISK LEVEL */}
          <div>
            <h2 className="font-bold text-xl mb-3">Risk Level</h2>

            <div
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
              ${
                advice.riskLevel === "HIGH"
                  ? "bg-red-100 text-red-600"
                  : advice.riskLevel === "LOW"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {advice.riskLevel}
            </div>
          </div>

          {/* FUTURE OUTLOOK */}
          <div>
            <h2 className="font-bold text-xl mb-3">Future Outlook</h2>

            <p className="text-gray-700 leading-relaxed">
              {advice.futureOutlook}
            </p>
          </div>

          {/* PREDICTION */}
          <div>
            <h2 className="font-bold text-xl mb-3">
              Predicted Next Month Expense
            </h2>

            <p className="text-3xl font-bold text-blue-600">
              ₹{advice.predictedExpense}
            </p>
          </div>

          {/* TIPS */}
          <div>
            <h2 className="font-bold text-xl mb-3">Smart Suggestions</h2>

            <div className="flex flex-col gap-3">
              {advice.tips?.map((tip, index) => (
                <div key={index} className="bg-gray-50 border rounded-2xl p-4">
                  • {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiInsights;
