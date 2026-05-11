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
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          // Agar logged in hai toh dashboard bhej do, warna login
          element: isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          ),
        },
        {
          path: "register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
        {
          path: "login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        // Saare sensitive routes ProtectedRoute ke andar
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
          element: <AiInsights />,
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
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;
