import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import EventsList from "./features/events/Events";
import SingleEvent from "./features/events/SingleEvent";

import RequireAuth from "./features/auth/RequireAuth";
import DashboardPage from "./pages/dashboard.page";
import EditEvent from "./features/events/EditEvent";
import ManageEventList from "./features/events/ManageEvents";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="events" element={<EventsList />} />
        <Route path="events/:id" element={<SingleEvent />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="admin/events" element={<ManageEventList />} />
          <Route path="admin/events/0" element={<EditEvent />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
