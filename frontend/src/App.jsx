// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "../components/RootLayout";
// import Dashboard from "../components/Dashboard";
// import Register from "../components/register";
// import Login from "../components/Login";
// import UploadReceipt from "../components/UploadReceipt";

// function App() {
//   const routerObj = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       children: [
//         {
//           index: true, 
//           element: <Login />,
//         },
//         {
//           path: "register",
//           element: <Register />,
//         },
//         {
//           path: "login",
//           element: <Login />,
//         },
//         {
//           path: "dashboard",
//           element: <Dashboard />,
//         },
//         {
//           path: "upload-receipt",
//           element: <UploadReceipt />,
//         },
//         {
//           path: "analytics",
//           element: <div className="text-white">ANALYTICS</div>,
//         },
//         {
//           path: "ai-insights",
//           element: <div className="text-white">AI_ANALYSIS</div>,
//         },
//         {
//           path: "settings",
//           element: <div className="text-white">SYSTEM_SETTINGS</div>,
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={routerObj} />;
// }

// export default App;






import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Dashboard from "../components/Dashboard";
import Register from "../components/register";
import Login from "../components/Login";
import UploadReceipt from "../components/UploadReceipt";
import { useAuth } from "../store/authStore";

// 1. Gatekeeper for Protected Routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// 2. Gatekeeper for Public Routes (Login/Register pe logged-in user nahi ja sakta)
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
          element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />,
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
              <div className="text-white">ANALYTICS</div>
            </ProtectedRoute>
          ),
        },
        {
          path: "ai-insights",
          element: (
            <ProtectedRoute>
              <div className="text-white">AI_ANALYSIS</div>
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute>
              <div className="text-white">SYSTEM_SETTINGS</div>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;