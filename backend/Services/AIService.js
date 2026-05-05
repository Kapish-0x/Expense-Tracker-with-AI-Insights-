import axios from "axios";

export async function getFinancialAdvice(data) {
  try {
    const prompt = `
You are a personal finance advisor.

Analyze this user's finances:

Income: ₹${data.income}
Expense: ₹${data.expense}
Savings: ₹${data.savings}
Budget Used: ${data.percentageUsed}%
Top Spending Category: ${data.topCategory}
Predicted Next Month Expense: ₹${data.predicted}

Return ONLY valid JSON in this format:
{
  "summary":"",
  "riskLevel":"",
  "tips":["","",""],
  "savingsPotential":0
}
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "granite3.3:2b",
        prompt,
        stream: false
      }
    );

    // Ollama returns text in response.data.response
    const text = response.data.response.trim();

    // try parsing JSON
    return JSON.parse(text);

  } catch (err) {
    console.log("OLLAMA ERROR:", err.message);

    return {
      summary: `${data.topCategory} spending is high.`,
      riskLevel: data.percentageUsed > 80 ? "HIGH" : "MEDIUM",
      tips: [
        "Set category-wise monthly limits",
        "Track daily expenses",
        "Increase savings allocation"
      ],
      savingsPotential: Math.round(data.expense * 0.1)
    };
  }
}