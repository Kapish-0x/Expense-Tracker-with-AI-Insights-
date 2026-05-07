import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Headings
        "overview": "Overview",

        // Cards
        "total income": "Total Income",
        "total expense": "Total Expense",
        "net savings": "Net Savings",

        // Sidebar
        "dashboard": "Dashboard",
        "transactions": "Transactions",
        "ai insights": "AI Insights",
        "notifications": "Notifications",
        "settings": "Settings",

        // Misc
        "waiting data": "Waiting for transaction data...",
        "expense tracker": "Expense Tracker",
      }
    },

    hi: {
      translation: {
        // Headings
        "overview": "ओवरव्यू",

        // Cards
        "total income": "कुल आय",
        "total expense": "कुल खर्च",
        "net savings": "कुल बचत",

        // Sidebar
        "dashboard": "डैशबोर्ड",
        "transactions": "रूदाद",
        "ai insights": "एआई परिज्ञान",
        "notifications": "सूचनाएं",
        "settings": "सेटिंग्स",

        // Misc
        "waiting data": "ट्रांज़ैक्शन डेटा का इंतज़ार हो रहा है...",
        "expense tracker": "खर्च प्रबंधक",
      }
    },

    te: {
      translation: {
        // Headings
        "overview": "సారాంశం",

        // Cards
        "total income": "పూర్తి ఆదాయం",
        "total expense": "పూర్తి  ఖర్చు",
        "net savings": "పూర్తి పొదుపు",

        // Sidebar
        "dashboard": "డాష్‌బోర్డ్",
        "transactions": "లావాదేవీలు",
        "ai insights": "ఏఐ విశ్లేషణలు",
        "notifications": "హెచ్చరికలు",
        "settings": "సెట్టింగ్స్",

        // Misc
        "waiting data": "లావాదేవీ డేటా కోసం వేచి ఉంది...",
        "expense tracker": "ఖర్చుల నివేదిక",
      }
    }
  },

  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;