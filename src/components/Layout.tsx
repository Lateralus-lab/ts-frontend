import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Layout = () => {
  const token = useSelector(selectCurrentToken);

  return (
    <div className="max-w-screen-lg m-auto px-4">
      <Header />
      <div className="flex">
        {!token ? null : <Sidebar />}
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
