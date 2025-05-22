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
      label: <Link to="/faq">FAQ Settings</Link>,
    },
  ];

  // ✅ Desktop Sidebar
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
