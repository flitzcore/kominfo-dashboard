import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-primary text-white vh-100 p-5" style={{ width: '200px', position: 'fixed' }}>
      <h4 className="text-center">Kominfo</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/profile" className="nav-link text-white">Profile</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/settings" className="nav-link text-white">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
