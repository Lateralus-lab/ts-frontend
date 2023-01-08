import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import SignupPage from "./pages/signup.page";

import RequireAuth from "./features/auth/RequireAuth";
import DashboardPage from "./pages/dashboard.page";
import EventsList from "./features/events/Events";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignupPage />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
