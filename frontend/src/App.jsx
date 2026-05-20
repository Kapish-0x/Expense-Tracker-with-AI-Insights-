// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";
// import RootLayout from "../components/RootLayout";
// import Dashboard from "../components/Dashboard";
// import Register from "../components/register";
// import Login from "../components/Login";
// import UploadReceipt from "../components/UploadReceipt";
// import { useAuth } from "../store/authStore";
// import AiInsights from "../components/AiInsights";
// import Settings from "../components/Settings";
// import Analytics from "../components/Analytics";
// import UserProfile from "../components/UserProfile";
// import Reports from "../components/Reports";
// import Homepage from "../components/HomePage";

// // 1. Gatekeeper for Protected Routes
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// // 2. Gatekeeper for Public Routes 
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
// };

// function App() {
//   const { isAuthenticated } = useAuth();

//   const routerObj = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       children: [
//         {
//           index: true,
//           // Agar logged in hai toh dashboard bhej do, warna login
//           element: isAuthenticated ? (
//             <Navigate to="/dashboard" replace />
//           ) : (
//             <Login />
//           ),
//         },
//         {
//           path: "register",
//           element: (
//             <PublicRoute>
//               <Register />
//             </PublicRoute>
//           ),
//         },
//         {
//           path: "login",
//           element: (
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           ),
//         },
//         // Saare sensitive routes ProtectedRoute ke andar
//         {
//           path: "dashboard",
//           element: (
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           ),
//         },
//         {
//           path: "upload-receipt",
//           element: (
//             <ProtectedRoute>
//               <UploadReceipt />
//             </ProtectedRoute>
//           ),
//         },
//         {
//           path: "analytics",
//           element: (
//             <ProtectedRoute>
//               <Analytics />
//             </ProtectedRoute>
//           ),
//         },
//         {
//           path: "ai-insights",
//           element: <AiInsights />,
//         },
//         {
//   path: "reports",
//   element: <Reports />,
// },
//         {
//           path: "settings",
//           element: (
//             <ProtectedRoute>
//               <Settings />
//             </ProtectedRoute>
//           ),
//         },
//         {
//            path: "profile",
//           element: (
//     <ProtectedRoute>
//       <UserProfile />
//     </ProtectedRoute>
//   ),
// },
//       ],
//     },
//   ]);

//   return <RouterProvider router={routerObj} />;
// }

// export default App;




import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Dashboard from "../components/Dashboard";
import Register from "../components/register";
import Login from "../components/Login";
import UploadReceipt from "../components/UploadReceipt";
import { useAuth } from "../store/authStore";
import AiInsights from "../components/AiInsights";
import Settings from "../components/Settings";
import Analytics from "../components/Analytics";
import UserProfile from "../components/UserProfile";
import Reports from "../components/Reports";
import Homepage from "../components/HomePage";

// 1. Gatekeeper for Protected Routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 2. Gatekeeper for Public Routes 
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  const { isAuthenticated } = useAuth();

  const routerObj = createBrowserRouter([
    // 🏠 Homepage standard sibling route banega taaki ispe Sidebar/RootLayout apply na ho
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <Homepage />,
    },
    // 🚪 Auth routes ko bhi hum layout se alag rakh rahe hain taaki login/register par app ka sidebar na dikhe
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    // 📊 Saare internal dashboard/app components RootLayout ke children rahenge
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "upload-receipt",
          element: (
            <ProtectedRoute>
              <UploadReceipt />
            </ProtectedRoute>
          ),
        },
        {
          path: "analytics",
          element: (
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          ),
        },
        {
          path: "ai-insights",
          element: (
            <ProtectedRoute>
              <AiInsights />
            </ProtectedRoute>
          ),
        },
        {
          path: "reports",
          element: (
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    // 🔄 Fallback Catch-all: Agar koi galat URL daale toh seedha home ya dashboard par bhej do
    {
      path: "*",
      element: <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />,
    },
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;