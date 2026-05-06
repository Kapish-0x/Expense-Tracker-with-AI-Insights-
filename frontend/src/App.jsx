// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "../components/RootLayout";
// import Dashboard from "../components/Dashboard";
// import Register from "../components/register";
// import Login from "../components/Login";
// import UploadReceipt from "../components/UploadReceipt";

// // function App() {
// //   const routerObj = createBrowserRouter([
// //     {
// //       path: "/",
// //       element: <RootLayout />,
// //       children: [
// //         {
// //           index: true,
// //           element: <Register />,
// //         },
// //         {
// //           path: "register",
// //           element: <Register />,
// //         },
// //         {
// //           path: "login",
// //           element: <Login />,
// //         },
// //         {
// //           path: "dashboard",
// //           element: <Dashboard />,
// //         },

// //         {
// //           path: "upload-receipt",
// //           element: <UploadReceipt />,
// //         },

// //         {
// //           path: "transactions",
// //           element: <div className="text-white">TRANSACTIONS_LOG</div>,
// //         },
// //         {
// //           path: "ai-insights",
// //           element: <div className="text-white">AI_ANALYSIS</div>,
// //         },
// //         {
// //           path: "settings",
// //           element: <div className="text-white">SYSTEM_SETTINGS</div>,
// //         },
// //       ],
// //     },
// //   ]);

// //   return <RouterProvider router={routerObj} />;
// // }

// // export default App;


// function App() {
//   const routerObj = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       children: [
//         {
//           index: true, // Jab user seedha domain pe aayega
//           element: <Register />,
//         },
//         {
//           path: "register", // /register
//           element: <Register />,
//         },
//         {
//           path: "login", // /login
//           element: <Login />,
//         },
//         {
//           path: "dashboard", // /dashboard
//           element: <Dashboard />,
//         },
//         {
//           path: "upload-receipt",
//           element: <UploadReceipt />,
//         },

//         {
//           path: "transactions",
//           element: <div className="text-white">TRANSACTIONS_LOG</div>,
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





import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Dashboard from "../components/Dashboard";
import Register from "../components/register";
import Login from "../components/Login";
import UploadReceipt from "../components/UploadReceipt";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true, // 🔥 Default route = Login
          element: <Login />,
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
          path: "upload-receipt",
          element: <UploadReceipt />,
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