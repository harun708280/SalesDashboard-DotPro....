import React, { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import TopHeader from '../components/TopHeader';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
    return (
        <div className='bg-gray-50'>
            <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} visible={visible} setVisible={setVisible}/>
            <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} visible={visible} setVisible={setVisible}/>
            
        </div>
    );
};

export default Layout;