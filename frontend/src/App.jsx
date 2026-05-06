import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Dashboard from "../components/Dashboard";
import Register from "../components/register";
import Login from "../components/Login";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true, // App khulne par seedha Register dikhega
          element: <Register />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "transactions",
          element: <div className="text-white">TRANSACTIONS_LOG</div>,
        },
        {
          path: "ai-insights",
          element: <div className="text-white">AI_ANALYSIS</div>,
        },
        {
          path: "settings",
          element: <div className="text-white">SYSTEM_SETTINGS</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;
