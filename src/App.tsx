import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import EventsList from "./features/events/Events";
import Event from "./features/events/Event";

import RequireAuth from "./features/auth/RequireAuth";
import DashboardPage from "./pages/dashboard.page";
import ManageEvents from "./features/manageEvents/ManageEvents";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="events" element={<EventsList />} />
        <Route path="events/:id" element={<Event />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="admin/manage-events" element={<ManageEvents />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
