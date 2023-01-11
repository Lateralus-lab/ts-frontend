import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/styles.css";
import App from "./App";

import { store } from "./app/store";
import { Provider } from "react-redux";

<<<<<<< HEAD
=======
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
>>>>>>> parent of f5d5a3b (fixed authentication bug)
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// import ErrorPage from "./pages/error.page";
// import Login from "./pages/login.page";
// import DashboardPage from "./pages/dashboard.page";
// import EventsPage from "./pages/events.page";
// import EventPage from "./pages/event.page";
// import CataloguePage from "./pages/catalog.page";
// import SignupPage from "./pages/signup.page";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Login /> },
//       {
//         path: "/dashboard",
//         element: <DashboardPage />,
//       },
//       {
//         path: "/events",
//         element: <EventsPage />,
//       },
//       {
//         path: "/events/:id",
//         element: <EventPage />,
//       },
//       {
//         path: "/catalogue",
//         element: <CataloguePage />,
//       },
//       {
//         path: "/signup",
//         element: <SignupPage />,
//       },
//     ],
//   },
// ]);

// <RouterProvider router={router} />
