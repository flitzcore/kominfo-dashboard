// DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function DashboardLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{paddingLeft: '200px'}}>
        <Navbar />
        <div className="container-fluid" >
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
