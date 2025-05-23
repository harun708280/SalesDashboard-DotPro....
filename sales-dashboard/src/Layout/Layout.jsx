import React, { useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import TopHeader from "../components/TopHeader";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  
  const hideLayoutPaths = ["/"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideLayout && (
        <TopHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          visible={visible}
          setVisible={setVisible}
        />
      )}

      <div className="flex flex-1">
        {!hideLayout && (
          <SidebarMenu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            visible={visible}
            setVisible={setVisible}
          />
        )}

        <main
          className={`flex-1  min-h-[calc(100vh-80px)] overflow-auto transition-all duration-300 ${
            !hideLayout && !collapsed ? "ml-[260px] p-4" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
