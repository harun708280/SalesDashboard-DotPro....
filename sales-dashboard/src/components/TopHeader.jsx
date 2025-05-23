import React from "react";
import { Input, Avatar, Dropdown, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const TopHeader = ({ collapsed, setCollapsed, visible, setVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitleFromPath = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/faq":
        return "FAQ";
      default:
        return "Page";
    }
  };

  const pageTitle = getTitleFromPath(location.pathname);

  const user = {
    name: "Harun Or Rashid",
    email: "harun@example.com",
  };

  const handleLogout = () => {
    Cookies.remove("mockToken");
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="userinfo" disabled>
        <div className="flex flex-col px-2 py-1 select-none">
          <span className="font-semibold">{user.name}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full transition-all duration-300 bg-white h-20 py-2 flex items-center justify-between sticky top-0 z-40 px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 w-[220px]">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-xl font-bold uppercase">Dot Admin</h1>
        </div>

        {/* Desktop Sidebar Toggle Button */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex rounded-full justify-center items-center text-blue-600 bg-gray-100 text-xl"
          style={{ height: 40, width: 40 }}
        />

        <Button
          type="text"
          icon={visible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setVisible(true)}
          className="flex lg:hidden rounded-full justify-center items-center text-blue-600 bg-gray-100 text-xl"
          style={{ height: 35, width: 35 }}
        />

        <div className="hidden md:block">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="bg-gray-100 rounded-md border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-40 md:w-56 lg:w-64 text-sm placeholder-gray-500 transition"
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 hidden lg:block">
        {pageTitle}
      </h2>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>

        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar style={{ backgroundColor: "#1890ff" }} size="large">
            {user.name.charAt(0)}
          </Avatar>
        </Dropdown>

        {/* Desktop Logout Button */}
        <Button
          type="primary"
          className="hidden lg:block"
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TopHeader;
