import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/styles.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/error.page";
import Login from "./pages/login.page";
import DashboardPage from "./pages/dashboard.page";
import EventsPage from "./pages/events.page";
import EventPage from "./pages/event.page";
import CataloguePage from "./pages/catalog.page";
import SignupPage from "./pages/signup.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/events/:id",
        element: <EventPage />,
      },
      {
        path: "/catalogue",
        element: <CataloguePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
