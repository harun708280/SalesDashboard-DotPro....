
import React from 'react';
import Card from '../components/Card';
import SalesChart from '../components/SalesChart';
import CustomerTable from '../components/CustomerTable';

const Dashboard = () => {
    return (
        <div className='mx-4'>
            <Card/>
            <SalesChart/>
            <CustomerTable/>
            </div>
    );
};

export default Dashboard;