import React, { useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import TopHeader from "../components/TopHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        visible={visible}
        setVisible={setVisible}
      />

      <div className="flex flex-1">
        <SidebarMenu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          visible={visible}
          setVisible={setVisible}
        />

        <main
          className="flex-1 p-4 min-h-[calc(100vh-80px)] overflow-auto transition-all duration-300"
          style={{ marginLeft: collapsed ? 0 : 260 }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;