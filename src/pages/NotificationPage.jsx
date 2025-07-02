import React, { useEffect, useState } from 'react';
import api from '../api';
import '../App.css';

const NotificationPage = () => {
  const [alerts, setAlerts] = useState([]);
  const userId = localStorage.getItem('userId') || 'user123'; // fallback to test user

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get(`/alerts?userId=${userId}`);
        setAlerts(res.data);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
      }
    };

    fetchAlerts();
  }, [userId]);

  return (
    <div>
      <h2>My Job Alerts</h2>
      {alerts.length === 0 ? (
        <p>You have no alerts set up.</p>
      ) : (
        <ul className="alert-list">
          {alerts.map((alert) => (
            <li key={alert.id}>
               <strong>{alert.title}</strong> in <em>{alert.city}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
