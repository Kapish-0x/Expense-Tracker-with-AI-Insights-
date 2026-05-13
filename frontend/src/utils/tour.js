import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = async (navigate) => {
  navigate("/dashboard");

  await new Promise((resolve) => setTimeout(resolve, 700));
  const driverObj = driver({
    showProgress: true,

    steps: [
      {
        element: "#dashboard-overview",
        popover: {
          title: "Dashboard Overview",
          description:
            "This section gives you a complete overview of your financial activity including income, expenses, and savings.",
          side: "bottom",
          align: "start",
        },
      },

      {
        element: "#upload-receipt-btn",
        popover: {
          title: "Upload Receipts",
          description:
            "Scan bills and receipts instantly using OCR. Transactions are automatically added for you.",
          side: "bottom",
        },
      },

      {
        element: "#add-transaction-btn",
        popover: {
          title: "Add Transactions",
          description: "Manually add your income or expenses here.",
          side: "bottom",
        },
      },

      {
        element: "#stats-section",
        popover: {
          title: "Financial Stats",
          description:
            "Track your total income, spending, and net savings in real time.",
          side: "top",
        },
      },

      {
        element: "#recent-logs",
        popover: {
          title: "Recent Activity",
          description:
            "View, edit, or delete your latest financial transactions here.",
          side: "top",
        },
      },

      {
        element: "#analytics-nav",
        popover: {
          title: "Analytics",
          description:
            "Visualize spending trends and financial patterns with charts.",
          side: "right",
        },
      },

      {
        element: "#ai-nav",
        popover: {
          title: "AI Insights",
          description:
            "Get intelligent financial advice and future spending predictions powered by AI.",
          side: "right",
        },
      },

      {
        element: "#reports-nav",
        popover: {
          title: "Reports",
          description: "Generate downloadable PDF financial reports.",
          side: "right",
        },
      },

      {
        element: "#settings-nav",
        popover: {
          title: "Settings",
          description: "Customize alerts, savings goals, and preferences.",
          side: "right",
        },
      },

      {
        element: "#profile-section",
        popover: {
          title: "Your Profile",
          description: "Manage your profile and account settings from here.",
          side: "top",
        },
      },
    ],

    nextBtnText: "Next",
    prevBtnText: "Back",
    doneBtnText: "Finish",

    overlayColor: "rgba(0,0,0,0.75)",

    smoothScroll: true,

    allowClose: false,
  });

  driverObj.drive();
};
