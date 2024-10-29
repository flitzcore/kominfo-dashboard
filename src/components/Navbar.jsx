// Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus status autentikasi dari localStorage
    localStorage.removeItem('isAuthenticated');
    // Arahkan ke halaman login
    navigate('/admin/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100" >
      <div className="container-fluid">
        {/* Brand atau judul di sebelah kiri */}
        <a className="navbar-brand" href="/admin">Dashboard</a>
        
        {/* Tombol toggle untuk mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu navigasi (collapse untuk mobile) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* ms-auto untuk menempatkan item di sebelah kanan */}
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
