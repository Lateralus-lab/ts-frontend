import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import SignupPage from "./pages/signup.page";

import RequireAuth from "./features/auth/RequireAuth";
import DashboardPage from "./pages/dashboard.page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignupPage />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
