import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Layout = () => {
  const token = useSelector<string>(selectCurrentToken);

  const showSidebar = !token ? null : <Sidebar />;

  return (
    <div className="max-w-screen-lg m-auto px-4">
      <Header />
      <div className="flex">
        {showSidebar}
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
