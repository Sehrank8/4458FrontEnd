import React, { useState, useEffect } from 'react';
import api from '../api';
import '../App.css';

const NotificationPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    title: '',
    city: '',
  });

  const userId = 'user123'; // Replace with real login session

  const fetchAlerts = async () => {
    try {
      const res = await api.get(`/alerts?userId=${userId}`);
      setAlerts(res.data);
    } catch (err) {
      console.error('Alert fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleChange = (e) => {
    setNewAlert({ ...newAlert, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...newAlert, userId };
      await api.post('/alerts', payload);
      setNewAlert({ title: '', city: '' });
      fetchAlerts();
    } catch (err) {
      console.error('Failed to create alert:', err);
    }
  };

  return (
    <div className="notification-page">
      <h2>Create Job Alert</h2>

      <div className="form-section">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newAlert.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAlert.city}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Alarmı Kaydet</button>
      </div>

      <div className="existing-alerts">
        <h3>Existing Alerts:</h3>
        {alerts.length === 0 ? (
          <p>No existinh alerts.</p>
        ) : (
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id}>
                {alert.title} - {alert.city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
