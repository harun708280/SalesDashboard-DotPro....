import React, { useState } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const SidebarMenu = ({ collapsed, setCollapsed, visible, setVisible }) => {
  const location = useLocation();


  //  Sidebar Menu Items

  const menuItems = [
    {
      key: '/dashboard',
      icon: <AppstoreOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/faq',
      icon: <QuestionCircleOutlined />,
      label: <Link to="/faq">FAQ Settings</Link>,
    },
  ];


  const renderSidebar = (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedWidth={0}
      trigger={null}
      breakpoint="lg"
      className="hidden lg:block min-h-screen bg-white fixed top-[80px] left-0 z-20 transition-all duration-300"
      style={{ width: collapsed ? 80 : 260 }}
      width={260}
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="pt-2"
      />
    </Sider>
  );

  
  //  Mobile Drawer 
 
  const renderDrawer = (
    <Drawer
      title="Dot Admin"
      placement="left"
      onClose={() => setVisible(false)}
      open={visible}
      className="lg:hidden"
      bodyStyle={{ padding: 0 }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={() => setVisible(false)}
      />
    </Drawer>
  );

 
  return (
    <>
      {renderSidebar}
      {renderDrawer}
    </>
  );
};

export default SidebarMenu;
