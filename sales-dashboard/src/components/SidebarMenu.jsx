import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import {
  DashboardOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const SidebarMenu = ({collapsed,setCollapsed,visible,setVisible}) => {
  
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/faq',
      icon: <QuestionCircleOutlined />,
      label: <Link to="/faq">FAQ</Link>,
    },
  ];

  // ✅ Desktop Sidebar
  const renderSidebar = (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedWidth={0} // 👈 hide everything when collapsed
      trigger={null}     // 👈 no footer toggle button
      breakpoint="lg"
      className="hidden  p-4 lg:block min-h-[calc(100vh-5rem)] bg-white sticky transition-all duration-300"
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

  // ✅ Mobile Drawer
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
