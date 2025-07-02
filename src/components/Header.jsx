import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
      <button className="login-btn" onClick={() => navigate('/')}>Home</button>
      {isLoggedIn ? (
  <>
    <button className="login-btn" onClick={handleLogout}>Logout</button>
    
    <button className="login-btn" onClick={() => navigate('/notifications')}>Notifications</button>
    {userRole === 'ADMIN' && (
      <button className="login-btn" onClick={() => navigate('/admin/job')}>
        Admin Panel
      </button>
    )}
  </>

        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
