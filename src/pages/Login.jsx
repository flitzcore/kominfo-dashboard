// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../env/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simulasi login berhasil

    // if (email === 'admin@admin.com' && password === 'admin#1234') {
    //   localStorage.setItem('isAuthenticated', 'true');
    //   navigate('/dashboard'); // Redirect ke dashboard setelah login
    // } else {
    //   alert('Login failed!');
    // }

    try {
      const response = await axios.post(
        `${config.apiEndpoint}/login`,
        {
          Email: email,
          Password: password
        },
        {
          headers : {
            "Content-Type": 'application/json'
          }
        }
      );

      if (response.status === 200) {
        localStorage.setItem('isAuthenticated','true');
        navigate('/dashboard');
      }
    } catch(error) {
      if (error.response && error.response.status === 400){
        setError('Login gagal. Cek email dan password');
      } else {
        setError('Terjadi kesalahan, coba lagi nanti')
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
