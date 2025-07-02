import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const { username } = credentials;

    if (!username) {
      alert('Username cant be empty');
      return;
    }

    // Fake role and token
    const role = username === 'admin' ? 'ADMIN' : 'USER';
    const fakeToken = 'FAKE_JWT_TOKEN';

    localStorage.setItem('token', fakeToken);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', username);

    alert(`Logged in. Rol: ${role}`);
    navigate('/');
  };

  return (
    <div className="login-page">
      <h2>Giriş Yap</h2>
      <div className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
