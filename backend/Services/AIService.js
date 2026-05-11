import axios from "axios";

export async function getFinancialAdvice(data) {
  try {
    const prompt = `
You are a smart AI financial advisor for a modern expense tracker application.

Your job is to analyze the user's financial behavior realistically and professionally.

USER FINANCIAL DATA:
- Monthly Income: ₹${data.income}
- Monthly Expenses: ₹${data.expense}
- Current Savings: ₹${data.savings}
- Budget Usage: ${data.percentageUsed}%
- Highest Spending Category: ${data.topCategory}
- Predicted Next Month Expense: ₹${data.predicted}

YOUR TASK:
- Analyze the user's spending habits.
- Determine whether finances are healthy, moderate, or risky.
- Analyze if future expenses are likely increasing.
- Mention whether the predicted expense trend is concerning.
- Give useful, realistic, practical tips.
- Make the response feel intelligent and personalized.

IMPORTANT RULES:
- Keep the summary short but insightful.
- Avoid robotic wording.
- Do not repeat exact numbers too much.
- Avoid generic tips like "save money".
- Tips should be actionable.
- Future outlook should feel predictive.
- Return ONLY valid JSON.
- No markdown.
- No explanation text.

JSON FORMAT:
{
  "summary": "",
  "riskLevel": "LOW or MEDIUM or HIGH",
  "futureOutlook": "",
  "tips": ["", "", ""],
  "predictedExpense": 0
}
`;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "granite3.3:2b",
      prompt,
      stream: false,
    });

    const raw = response.data.response;

    console.log("RAW AI:", raw);

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");

    const jsonString = raw.slice(start, end + 1);

    console.log("CLEAN JSON:", jsonString);

    return JSON.parse(jsonString);
  } catch (err) {
    console.log("AI ERROR:", err);

    return {
      summary:
        "Your finances are relatively stable, but current spending habits may reduce long-term savings efficiency if not monitored carefully.",

      riskLevel: "MEDIUM",

      futureOutlook:
        "Future expenses appear slightly higher than average, indicating a gradual increase in spending patterns.",

      tips: [
        "Limit high-frequency spending categories to avoid gradual monthly overspending",
        "Review weekly expense trends instead of waiting for month-end analysis",
        "Maintain an emergency savings buffer for unexpected future expenses",
      ],

      predictedExpense: data.predicted || 0,
    };
  }
}
