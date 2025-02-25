import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen, toggleSideBar }) => {
  return (
    <div className={`seller-sidebar bg-gray-800 text-white p-4 ${isSidebarOpen ? 'block' : 'hidden'} sm:block h-screen`}>
    <h1 className='text-xl pb-5'>Admin Dashboard</h1>
    <ul className='dashboard-links space-y-2'>
      <li className='hover:text-gray-800 hover:bg-white'>
        <Link to="profile" onClick={toggleSideBar}> Profile</Link>
      </li>
      <li className='hover:text-gray-800 hover:bg-white'>
        <Link to="usersdata" onClick={toggleSideBar}>Users</Link>
      </li>
      <li className='hover:text-gray-800 hover:bg-white'>
        <Link to="vendorsdata" onClick={toggleSideBar}>Sellers</Link>
      </li>
      <li className='hover:text-gray-800 hover:bg-white'>
        <Link to="product-approval" onClick={toggleSideBar}>Product Approval Request</Link>
      </li>
      <li className='hover:text-gray-800 hover:bg-white'>
        <Link to="seller-approval" onClick={toggleSideBar}>Seller Approval Request</Link>
      </li>
    </ul>
  </div>
  );
};

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className='container flex flex-col sm:flex-row'>
    <div className='sm:w-1/4 w-screen'>
      <button className='sm:hidden bg-gray-800 text-white p-2' onClick={toggleSideBar}>
        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
    </div>

    <div className='sm:w-3/4 w-full p-4 h-screen overflow-y-scroll'>
      <Outlet />
    </div>
  </div>
  );
};

export default AdminDashboard;
