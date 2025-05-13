import React from 'react';
import { Outlet } from 'react-router-dom';
import ColNav from './ColNav';

const Layout = () => {
  return (
    <div className="bg-gray-950 h-screen w-screen overflow-hidden flex flex-row">
      {/* Fixed Navigation Bar */}
      <ColNav />
      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 h-screen py-6 max-xs:pt-14 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;