import React from "react";
import { Input, Avatar, Dropdown, Menu } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const TopHeader = ({ collapsed, setCollapsed, visible, setVisible }) => {
  const location = useLocation();

  const getTitleFromPath = (pathname) => {
    switch (pathname) {
      case "/":
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

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="profile">
        Profile
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full bg-white h-20 py-2 flex items-center justify-between sticky top-0 z-40 px-4">
      
      <div className="flex items-center gap-4">
       
        <div className="flex items-center gap-2 w-[220px]">
          <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-xl font-bold uppercase">Dot Admin</h1>
        </div>

        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex text-blue-600 bg-gray-100 h-10 w-10 items-center justify-center rounded-full text-xl"
        >
          <MenuOutlined />
        </button>

       
        <button
          onClick={() => setVisible(true)}
          className="flex lg:hidden text-blue-600 bg-gray-100 h-10 w-10 items-center justify-center rounded-full text-xl"
        >
          <MenuOutlined />
        </button>

       
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="w-32 sm:w-56 bg-gray-100"
        />
      </div>

     
      <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
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
      </div>
    </div>
  );
};

export default TopHeader;
