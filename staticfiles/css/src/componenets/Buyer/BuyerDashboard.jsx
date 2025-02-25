import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const BuyerSidebar = ({ isSidebarOpen, toggleSideBar }) => {
  return (

    <div className={`seller-sidebar bg-gray-800 text-white p-4 ${isSidebarOpen ? 'block' : 'hidden'
      } sm:block  h-screen`}>
      <h1 className='text-xl pb-5'>Buyer Dashboard</h1>
      <ul className='dashboard-links space-y-2'>
        <li>
          <Link to="userprofile" onClick={toggleSideBar}> Profile</Link>
        </li>
        <li>
          <Link to="enquiries" onClick={toggleSideBar}> Enquiries</Link>
        </li>
      </ul>
    </div>
  );
};

const BuyerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='sm:w-1/6 w-screen'>
        <button className='sm:hidden bg-gray-800 text-white p-2' onClick={toggleSideBar}>
          {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <BuyerSidebar isSidebarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
      </div>
      <div className='sm:w-5/6 w-full p-4 h-screen overflow-y-scroll'>
        <Outlet />
      </div>

    </div>
  );
};

export default BuyerDashboard;
