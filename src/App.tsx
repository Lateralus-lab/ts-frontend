import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import EventsList from "./features/allEvents/Events";
import Event from "./features/allEvents/Event";

import RequireAuth from "./features/auth/RequireAuth";
import DashboardPage from "./pages/dashboard.page";
<<<<<<< HEAD
import ManageEvents from "./features/manageEvents/ManageEvents";
=======
>>>>>>> parent of f5d5a3b (fixed authentication bug)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="events" element={<EventsList />} />
        <Route path="events/:id" element={<Event />} />

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />
<<<<<<< HEAD
          <Route path="admin/manage-events" element={<ManageEvents />} />
=======
>>>>>>> parent of f5d5a3b (fixed authentication bug)
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
