import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // GENERAL
        cashflow : "CashFlow",
        overview: "Overview",
        analytics: "Analytics",
        reports: "Reports",
        profile: "Profile",
        logout: "Logout",
        dashboard: "Dashboard",
        settings: "Settings",
        notifications: "Notifications",
        transactions: "Transactions",
        "ai insights": "AI Insights",
        "expense tracker": "Expense Tracker",

        // DASHBOARD
        "total income": "Total Income",
        "total expense": "Total Expense",
        "net savings": "Net Savings",
        "waiting data": "Waiting for transaction data...",
        "upload receipt": "Upload Receipt",
        "add transaction": "Add Transaction",
        "recent logs": "Recent Logs",

        // REPORTS
        "export pdf": "Export PDF",
        "financial report": "Financial Report",
        "financial score": "Financial Score",
        "monthly statement": "Monthly Financial Statement",
        "transaction ledger": "Transaction Ledger",
        "financial statements": "Financial Statements",
        "last 7 days": "Last 7 Days",
        "last 30 days": "Last 30 Days",
        "last 3 months": "Last 3 Months",
        "last 1 year": "Last 1 Year",
        score: "Score",
        "overall financial health": "Overall Financial Health",
        "excellent finance desc":
          "Your financial health is excellent and well balanced.",
        "stable finance desc":
          "Your finances are stable with controlled spending.",
        "moderate finance desc":
          "Your finances are moderate and need better planning.",
        "poor finance desc": "Your spending is high and savings are low.",

        "monthly financial statement": "Monthly Financial Statement",
        excellent: "Excellent",
        stable: "Stable",
        moderate: "Moderate",
        "needs attention": "Needs Attention",
        "generated on": "Generated On",
        "report range": "Report Range",
        "loading reports": "Loading Reports...",
        "net balance": "Net Balance",

  "analytics": "Analytics",
  "total income": "Total Income",
  "total expense": "Total Expense",
  "top category": "Top Category",
  "savings rate": "Savings Rate",
  "income vs expense": "Income vs Expense",
  "category breakdown": "Category Breakdown",
  "savings goals": "Savings Goals",
  "add goal": "Add Goal",
  "no goals": "No goals set yet",
  "progress": "Progress",
  "savings": "Savings",
  "completed": "Completed",
  "deadline": "Deadline",
  "income": "Income",
  "expense": "Expense",
  "jan": "Jan",
  "feb": "Feb",
  "mar": "Mar",
  "apr": "Apr",
  "may": "May",
  "jun": "Jun",
  "jul": "Jul",
  "aug": "Aug",
  "sep": "Sep",
  "oct": "Oct",
  "nov": "Nov",
  "dec": "Dec",
        month: "Month",
        income: "Income",
        expense: "Expense",
        balance: "Balance",

        description: "Description",
        category: "Category",
        type: "Type",
        date: "Date",

        // PROFILE
        "edit profile": "Edit Profile",
        "save profile": "Save Profile",
        "clear transactions": "Clear Transactions",
        "restart tour": "Restart App Tour",
        "guest user": "Guest User",
        "no email": "No Email",

        // SETTINGS
        "settings subtitle": "Manage financial limits and account security.",

        "budget limits": "Budget Limits",
        "monthly budget": "Monthly Budget Limit",
        "min savings": "Minimum Savings",
        "update limits": "Update Limits",
        syncing: "Syncing...",

        "alert prefs": "Alert Preferences",
        "savings warning": "Savings Warning",
        "savings warning desc": "Alerts when savings drop below minimum limit.",

        "budget limit": "Budget Limit",
        "budget limit desc": "Notify when spending exceeds monthly budget.",

        "change password": "Change your Password",
        "current password": "Current Password",
        "new password": "New Password",
        save: "Save",
        processing: "Processing...",

        "account deletion": "Account Deletion",
        "account deletion desc": "Erases all data permanently.",
        delete: "Delete",

        // AI INSIGHTS
        "ai analysis": "AI Analysis",
        "generating ai": "Generating AI Insights",
        "generating ai insights": "Generating AI Insights",
        "ai loading desc":
          "Analyzing spending patterns and predicting future trends...",
        "financial summary": "Financial Summary",
        "risk level": "Risk Level",
        "future outlook": "Future Outlook",
        "predicted expense": "Predicted Next Month Expense",
        "smart suggestions": "Smart Suggestions",
        "ai fallback summary": "Unable to generate AI insights currently.",
        "ai fallback outlook": "Future expense trend could not be analyzed.",

        // RECEIPT OCR
        "scan receipt": "Scan Receipt",
        "receipt subtitle":
          "Upload a bill or receipt to extract expense details instantly.",
        "select image": "Select Receipt Image",
        "drag drop": "Drag & drop your receipt here or browse files.",
        "supported formats": "PNG, JPG, JPEG supported",
        uploading: "Uploading...",
        "scan receipt btn": "Scan Receipt",
        vendor: "Vendor",
        amount: "Amount",
        "scan successful": "Receipt scanned successfully",

        // ROOT LAYOUT
        "syncing node": "Syncing Node...",

        // TOUR
        "dashboard overview": "Dashboard Overview",

        "tour dashboard desc":
          "This section gives you a complete overview of your financial activity including income, expenses, and savings.",

        "tour upload title": "Upload Receipts",
        "tour upload desc":
          "Scan bills and receipts instantly using OCR. Transactions are automatically added for you.",

        "tour add transaction title": "Add Transactions",
        "tour add transaction desc":
          "Manually add your income or expenses here.",

        "tour stats title": "Financial Statistics",
        "tour stats desc":
          "Track your total income, spending, and net savings in real time.",

        "tour logs title": "Recent Activity",
        "tour logs desc":
          "View, edit, or delete your latest financial transactions here.",

        "tour analytics title": "Analytics",
        "tour analytics desc":
          "Visualize spending trends and financial patterns with charts.",

        "tour ai title": "AI Insights",
        "tour ai desc":
          "Get intelligent financial advice and spending predictions powered by AI.",

        "tour reports title": "Reports",
        "tour reports desc": "Generate downloadable PDF financial reports.",

        "tour settings title": "Settings",
        "tour settings desc":
          "Customize alerts, savings goals, and preferences.",

        "tour profile title": "Your Profile",
        "tour profile desc":
          "Manage your profile and account settings from here.",

        "tour next": "Next",
        "tour back": "Back",
        "tour finish": "Finish",
        language: "Language",
        "no transactions": "No transactions found",
      },
    },

    hi: {
      translation: {
        "cashflow": "कैशफ्लो",
        overview: "ओवरव्यू",
        analytics: "विश्लेषण",
        reports: "रिपोर्ट्स",
        profile: "प्रोफाइल",
        logout: "लॉगआउट",
        dashboard: "डैशबोर्ड",
        settings: "सेटिंग्स",
        notifications: "सूचनाएं",
        transactions: "लेनदेन",
        "ai insights": "एआई इनसाइट्स",
        "expense tracker": "खर्च ट्रैकर",

        "total income": "कुल आय",
        "total expense": "कुल खर्च",
        "net savings": "कुल बचत",

        "waiting data": "ट्रांज़ैक्शन डेटा का इंतज़ार हो रहा है...",
        "upload receipt": "रसीद अपलोड करें",
        "add transaction": "ट्रांज़ैक्शन जोड़ें",
        "recent logs": "हाल की गतिविधियाँ",

        "export pdf": "पीडीएफ डाउनलोड करें",
        "financial report": "वित्तीय रिपोर्ट",
        "financial score": "वित्तीय स्कोर",
        "monthly statement": "मासिक वित्तीय विवरण",
        "transaction ledger": "लेनदेन रिकॉर्ड",
        "financial statements": "वित्तीय विवरण",
        "last 7 days": "पिछले 7 दिन",
        "last 30 days": "पिछले 30 दिन",
        "last 3 months": "पिछले 3 महीने",
        "last 1 year": "पिछला 1 वर्ष",
        score: "स्कोर",
        "overall financial health": "संपूर्ण वित्तीय स्थिति",
        "excellent finance desc":
          "आपकी वित्तीय स्थिति बहुत अच्छी और संतुलित है।",
        "stable finance desc":
          "आपकी वित्तीय स्थिति स्थिर है और खर्च नियंत्रित हैं।",
        "moderate finance desc":
          "आपकी वित्तीय स्थिति सामान्य है और बेहतर योजना की आवश्यकता है।",
        "poor finance desc": "आपके खर्च अधिक हैं और बचत कम है।",
        "monthly financial statement": "मासिक वित्तीय विवरण",
        month: "महीना",
        income: "आय",
        expense: "खर्च",
        balance: "शेष राशि",
        description: "विवरण",
        category: "श्रेणी",
        type: "प्रकार",
        date: "तारीख",
        // Status labels for Score Card
        excellent: "बेहतरीन",
        stable: "स्थिर",
        moderate: "सामान्य",
        "needs attention": "ध्यान देने की जरूरत",

        // Other missing keys in your code
        "generated on": "जनरेट किया गया",
        "report range": "रिपोर्ट की अवधि",
        "loading reports": "रिपोर्ट लोड हो रही है...",
        "net balance": "कुल शेष",

        "edit profile": "प्रोफाइल संपादित करें",
        "save profile": "प्रोफाइल सेव करें",
        "clear transactions": "सभी ट्रांज़ैक्शन हटाएं",
        "restart tour": "ऐप टूर फिर से शुरू करें",
        "guest user": "अतिथि उपयोगकर्ता",
        "no email": "कोई ईमेल नहीं",
        // Analytics & Goals
"analytics": "एनालिटिक्स",
"category breakdown": "श्रेणी विवरण",
"income vs expense": "आय बनाम खर्च",
"savings goals": "बचत के लक्ष्य",
"add goal": "लक्ष्य जोड़ें",
"no goals": "कोई लक्ष्य नहीं",
"others": "अन्य",
"shopping": "खरीदारी",
"receipt": "रसीद",
"not available": "उपलब्ध नहीं",

        "settings subtitle": "वित्तीय सीमाएँ और अकाउंट सुरक्षा प्रबंधित करें।",

        "budget limits": "बजट सीमाएँ",
        "monthly budget": "मासिक बजट सीमा",
        "min savings": "न्यूनतम बचत",
        "update limits": "सीमाएँ अपडेट करें",
        syncing: "सिंक हो रहा है...",

        "alert prefs": "अलर्ट प्राथमिकताएँ",
        "savings warning": "बचत चेतावनी",
        "savings warning desc": "बचत न्यूनतम सीमा से नीचे जाने पर अलर्ट।",

        "budget limit": "बजट सीमा",
        "budget limit desc": "खर्च बजट से अधिक होने पर सूचित करें।",
        "monthly budget": "मासिक बजट सीमा",

        "change password": "पासवर्ड बदलें",
        "current password": "वर्तमान पासवर्ड",
        "new password": "नया पासवर्ड",
        save: "सेव करें",
        processing: "प्रोसेस हो रहा है...",

        "account deletion": "अकाउंट हटाना",
        "account deletion desc": "सभी डेटा स्थायी रूप से मिटा देगा।",
        delete: "हटाएँ",

        "ai analysis": "एआई विश्लेषण",
        "generating ai": "एआई इनसाइट्स तैयार हो रही हैं",
        "generating ai insights": "एआई इनसाइट्स तैयार हो रहे हैं",
        "ai loading desc":
          "खर्च पैटर्न और भविष्य के ट्रेंड्स का विश्लेषण किया जा रहा है...",
        "financial summary": "वित्तीय सारांश",
        "risk level": "जोखिम स्तर",
        "future outlook": "भविष्य का अनुमान",
        "predicted expense": "अगले महीने का अनुमानित खर्च",
        "smart suggestions": "स्मार्ट सुझाव",
        "ai fallback summary": "फिलहाल एआई इनसाइट्स उपलब्ध नहीं हैं।",
        "ai fallback outlook": "भविष्य के खर्च का विश्लेषण नहीं हो सका।",
      
  "analytics": "विश्लेषण",
  "total income": "कुल आय",
  "total expense": "कुल व्यय",
  "top category": "शीर्ष श्रेणी",
  "savings rate": "बचत दर",
  "income vs expense": "आय बनाम व्यय",
  "category breakdown": "श्रेणी विवरण",
  "savings goals": "बचत लक्ष्य",
  "add goal": "लक्ष्य जोड़ें",
  "no goals": "कोई लक्ष्य नहीं",
  "progress": "प्रगति",
  "savings": "बचत",
  "completed": "पूरा हुआ",
  "deadline": "समय सीमा",
  "loading analytics": "विश्लेषण लोड हो रहा है...",
  "income": "आय",
  "expense": "खर्च",
  "not available": "उपलब्ध नहीं",
  "jan": "जनवरी",
  "feb": "फरवरी",
  "mar": "मार्च",
  "apr": "अप्रैल",
  "may": "मई",
  "jun": "जून",
  "jul": "जुलाई",
  "aug": "अगस्त",
  "sep": "सितंबर",
  "oct": "अक्टूबर",
  "nov": "नवंबर",
  "dec": "दिसंबर",
  "others": "अन्य",

        "scan receipt": "रसीद स्कैन करें",
        "receipt subtitle": "खर्च विवरण निकालने के लिए बिल या रसीद अपलोड करें।",
        "select image": "रसीद छवि चुनें",
        "drag drop": "रसीद यहाँ ड्रैग करें या फाइल ब्राउज़ करें।",
        "supported formats": "PNG, JPG, JPEG समर्थित",
        uploading: "अपलोड हो रहा है...",
        "scan receipt btn": "रसीद स्कैन करें",
        vendor: "विक्रेता",
        amount: "राशि",
        "scan successful": "रसीद सफलतापूर्वक स्कैन हुई",

        "syncing node": "सिंक हो रहा है...",

        "dashboard overview": "डैशबोर्ड ओवरव्यू",

        "tour dashboard desc":
          "यह सेक्शन आपकी आय, खर्च और बचत का पूरा सारांश दिखाता है।",

        "tour upload title": "रसीद अपलोड करें",
        "tour upload desc":
          "OCR द्वारा रसीद स्कैन करें और ट्रांज़ैक्शन ऑटोमेटिक जोड़ें।",

        "tour add transaction title": "ट्रांज़ैक्शन जोड़ें",
        "tour add transaction desc": "यहाँ अपनी आय या खर्च जोड़ें।",

        "tour stats title": "वित्तीय आँकड़े",
        "tour stats desc": "अपनी आय, खर्च और बचत को रियल टाइम में ट्रैक करें।",

        "tour logs title": "हाल की गतिविधि",
        "tour logs desc": "अपनी हाल की गतिविधियाँ देखें और प्रबंधित करें।",

        "tour analytics title": "विश्लेषण",
        "tour analytics desc": "चार्ट्स द्वारा खर्च पैटर्न समझें।",

        "tour ai title": "एआई इनसाइट्स",
        "tour ai desc": "AI आधारित वित्तीय सुझाव प्राप्त करें।",

        "tour reports title": "रिपोर्ट्स",
        "tour reports desc": "डाउनलोड करने योग्य रिपोर्ट्स बनाएँ।",

        "tour settings title": "सेटिंग्स",
        "tour settings desc": "अलर्ट्स और प्राथमिकताएँ बदलें।",

        "tour profile title": "आपकी प्रोफाइल",
        "tour profile desc": "यहाँ से अपनी प्रोफाइल मैनेज करें।",

        "tour next": "आगे",
        "tour back": "पीछे",
        "tour finish": "समाप्त",
        language: "भाषा",
        "no transactions": "कोई लेनदेन नहीं मिला",
      },
    },

    te: {
      translation: {
        "cashflow": "క్యాష్ ఫ్లో",
        overview: "సారాంశం",
        "no transactions": "ఎటువంటి లావాదేవీలు లేవు",
        analytics: "విశ్లేషణలు",
        reports: "రిపోర్ట్స్",
        profile: "ప్రొఫైల్",
        logout: "లాగౌట్",
        dashboard: "డాష్‌బోర్డ్",
        settings: "సెట్టింగ్స్",
        notifications: "నోటిఫికేషన్స్",
        transactions: "లావాదేవీలు",
        "ai insights": "ఏఐ విశ్లేషణలు",
        "expense tracker": "ఖర్చుల ట్రాకర్",

        "total income": "మొత్తం ఆదాయం",
        "total expense": "మొత్తం ఖర్చు",
        "net savings": "మొత్తం పొదుపు",

        "waiting data": "లావాదేవీ డేటా కోసం వేచి ఉంది...",
        "upload receipt": "రసీదు అప్లోడ్ చేయి",
        "add transaction": "లావాదేవీ జోడించు",
        "recent logs": "ఇటీవలి లాగ్స్",

        "export pdf": "PDF ఎగుమతి చేయి",
        "financial report": "ఆర్థిక రిపోర్ట్",
        "financial score": "ఆర్థిక స్కోర్",
        "monthly statement": "మాసిక ఆర్థిక నివేదిక",
        "transaction ledger": "లావాదేవీ రికార్డు",
        "financial statements": "ఆర్థిక నివేదికలు",
        // Analytics & Goals
"analytics": "విశ్లేషణలు",
"category breakdown": "వర్గం విశ్లేషణ",
"income vs expense": "ఆదాయం వర్సెస్ ఖర్చు",
"savings goals": "పొదుపు లక్ష్యాలు",
"add goal": "లక్ష్యాన్ని జోడించు",
"no goals": "లక్ష్యాలు లేవు",
"others": "ఇతరాలు",
"shopping": "షాపింగ్",
"receipt": "రశీదు",
"not available": "అందుబాటులో లేదు",

        "edit profile": "ప్రొఫైల్ మార్చు",
        "save profile": "ప్రొఫైల్ సేవ్ చేయి",
        "clear transactions": "అన్ని లావాదేవీలు తొలగించు",
        "restart tour": "యాప్ టూర్ మళ్లీ ప్రారంభించు",
        "guest user": "అతిథి వినియోగదారు",
        "no email": "ఈమెయిల్ లేదు",

        "settings subtitle":
          "ఆర్థిక పరిమితులు మరియు ఖాతా భద్రతను నిర్వహించండి.",

        "budget limits": "బడ్జెట్ పరిమితులు",
        "monthly budget": "మాసిక బడ్జెట్ పరిమితి",
        "min savings": "కనిష్ట పొదుపు",
        "update limits": "పరిమితులు నవీకరించు",
        syncing: "సింక్ అవుతోంది...",
        "last 7 days": "గత 7 రోజులు",
        "last 30 days": "గత 30 రోజులు",
        "last 3 months": "గత 3 నెలలు",
        "last 1 year": "గత 1 సంవత్సరం",
        score: "స్కోర్",
        "overall financial health": "మొత్తం ఆర్థిక స్థితి",

        "excellent finance desc": "మీ ఆర్థిక స్థితి చాలా మంచి సమతుల్యతలో ఉంది.",

        "stable finance desc":
          "మీ ఆర్థిక పరిస్థితి స్థిరంగా ఉంది మరియు ఖర్చులు నియంత్రణలో ఉన్నాయి.",

        "moderate finance desc":
          "మీ ఆర్థిక పరిస్థితి సాధారణంగా ఉంది మరియు మంచి ప్రణాళిక అవసరం.",

        "poor finance desc":
          "మీ ఖర్చులు ఎక్కువగా ఉన్నాయి మరియు పొదుపు తక్కువగా ఉంది.",

        "monthly financial statement": "మాసిక ఆర్థిక నివేదిక",

        month: "నెల",
        income: "ఆదాయం",
        expense: "ఖర్చు",
        balance: "మిగులు",

        description: "వివరణ",
        category: "వర్గం",
        type: "రకం",
        date: "తేదీ",

        "alert prefs": "అలర్ట్ ప్రాధాన్యతలు",
        "savings warning": "పొదుపు హెచ్చరిక",
        "savings warning desc": "పొదుపు పరిమితి కంటే తగ్గితే హెచ్చరిక.",

        "budget limit": "బడ్జెట్ పరిమితి",
        "budget limit desc": "ఖర్చు బడ్జెట్ మించితే తెలియజేయండి.",

        "change password": "పాస్‌వర్డ్ మార్చండి",
        "current password": "ప్రస్తుత పాస్‌వర్డ్",
        "new password": "కొత్త పాస్‌వర్డ్",
        save: "సేవ్ చేయి",
        processing: "ప్రాసెస్ అవుతోంది...",

        "account deletion": "ఖాతా తొలగింపు",
        "account deletion desc": "అన్ని డేటాను శాశ్వతంగా తొలగిస్తుంది.",
        delete: "తొలగించు",
        // Status labels for Score Card
        excellent: "అద్భుతమైనది",
        stable: "స్థిరంగా ఉంది",
        moderate: "సాధారణం",
        "needs attention": "శ్రద్ధ అవసరం",

        // Other missing keys in your code
        "generated on": "నివేదిక తేదీ",
        "report range": "రిపోర్ట్ పరిధి",
        "loading reports": "రిపోర్ట్స్ లోడ్ అవుతున్నాయి...",
        "net balance": "మొత్తం మిగులు",

        "ai analysis": "ఏఐ విశ్లేషణ",
        "generating ai insights": "ఏఐ విశ్లేషణలు రూపొందుతున్నాయి",
        "generating ai": "ఏఐ ఇన్‌సైట్స్ రూపొందుతున్నాయి",
        "ai loading desc":
          "ఖర్చుల నమూనాలు మరియు భవిష్యత్ ట్రెండ్స్ విశ్లేషించబడుతున్నాయి...",
        "financial summary": "ఆర్థిక సారాంశం",
        "risk level": "ప్రమాద స్థాయి",
        "future outlook": "భవిష్యత్ అంచనా",
        "predicted expense": "తదుపరి నెల అంచనా ఖర్చు",
        "smart suggestions": "స్మార్ట్ సూచనలు",
        "ai fallback summary": "ప్రస్తుతం ఏఐ ఇన్‌సైట్స్ అందుబాటులో లేవు.",
        "ai fallback outlook": "భవిష్యత్ ఖర్చు విశ్లేషించబడలేదు.",

  "analytics": "విశ్లేషణలు",
  "total income": "మొత్తం ఆదాయం",
  "total expense": "మొత్తం ఖర్చు",
  "top category": "అగ్ర వర్గం",
  "savings rate": "పొదుపు రేటు",
  "income vs expense": "ఆదాయం వర్సెస్ ఖర్చు",
  "category breakdown": "వర్గం విభజన",
  "savings goals": "పొదుపు లక్ష్యాలు",
  "add goal": "లక్ష్యాన్ని జోడించు",
  "no goals": "లక్ష్యాలు లేవు",
  "progress": "పురోగతి",
  "savings": "పొదుపు",
  "completed": "పూర్తయింది",
  "deadline": "గడువు",
  "loading analytics": "విశ్లేషణలను లోడ్ చేస్తోంది...",
  "income": "ఆదాయం",
  "expense": "ఖర్చు",
  "not available": "అందుబాటులో లేదు",
  "jan": "జనవరి",
  "feb": "ఫిబ్రవరి",
  "mar": "మార్చి",
  "apr": "ఏప్రిల్",
  "may": "మే",
  "jun": "జూన్",
  "jul": "జూలై",
  "aug": "ఆగస్టు",
  "sep": "సెప్టెంబర్",
  "oct": "అక్టోబర్",
  "nov": "నవంబర్",
  "dec": "డిసెంబర్",
  "others": "ఇతరములు",
        "scan receipt": "రసీదు స్కాన్ చేయి",
        "receipt subtitle":
          "ఖర్చు వివరాలు పొందడానికి బిల్ లేదా రసీదు అప్లోడ్ చేయండి.",
        "select image": "రసీదు చిత్రం ఎంచుకోండి",
        "drag drop": "రసీదును ఇక్కడ డ్రాగ్ చేయండి లేదా ఫైల్ ఎంచుకోండి.",
        "supported formats": "PNG, JPG, JPEG మద్దతు ఉంది",
        uploading: "అప్లోడ్ అవుతోంది...",
        "scan receipt btn": "రసీదు స్కాన్ చేయి",
        vendor: "విక్రేత",
        amount: "మొత్తం",
        "scan successful": "రసీదు విజయవంతంగా స్కాన్ అయింది",

        "syncing node": "సింక్ అవుతోంది...",

        "dashboard overview": "డాష్‌బోర్డ్ సారాంశం",

        "tour dashboard desc":
          "ఈ విభాగం మీ ఆదాయం, ఖర్చులు మరియు పొదుపుల వివరాలను చూపిస్తుంది.",

        "tour upload title": "రసీదులు అప్లోడ్ చేయండి",
        "tour upload desc":
          "OCR ద్వారా రసీదులు స్కాన్ చేసి లావాదేవీలు జోడించండి.",

        "tour add transaction title": "లావాదేవీ జోడించండి",
        "tour add transaction desc": "మీ ఆదాయం లేదా ఖర్చులను జోడించండి.",

        "tour stats title": "ఆర్థిక గణాంకాలు",
        "tour stats desc": "మీ ఆదాయం, ఖర్చులు మరియు పొదుపులను ట్రాక్ చేయండి.",

        "tour logs title": "ఇటీవలి కార్యకలాపాలు",
        "tour logs desc": "మీ తాజా లావాదేవీలను చూడండి మరియు నిర్వహించండి.",

        "tour analytics title": "విశ్లేషణలు",
        "tour analytics desc": "చార్ట్స్ ద్వారా ఖర్చుల నమూనాలను విశ్లేషించండి.",

        "tour ai title": "ఏఐ విశ్లేషణలు",
        "tour ai desc": "AI ఆధారిత ఆర్థిక సూచనలు పొందండి.",

        "tour reports title": "రిపోర్ట్స్",
        "tour reports desc": "డౌన్‌లోడ్ చేయగల రిపోర్టులను సృష్టించండి.",

        "tour settings title": "సెట్టింగ్స్",
        "tour settings desc": "అలర్ట్స్ మరియు ప్రాధాన్యతలను మార్చండి.",

        "tour profile title": "మీ ప్రొఫైల్",
        "tour profile desc": "ఇక్కడి నుండి మీ ప్రొఫైల్ నిర్వహించండి.",

        "tour next": "తర్వాత",
        "tour back": "వెనక్కి",
        "tour finish": "ముగించు",
        language: "భాష",
      },
    },
  },

  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
