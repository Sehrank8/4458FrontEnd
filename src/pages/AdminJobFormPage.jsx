import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const AdminJobFormPage = () => {
  const { id } = useParams(); // if present, we're editing
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: '',
    description: '',
    city: '',
    company: '',
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchJob = async () => {
        try {
          const res = await api.get(`/admin/jobs/${id}`);
          setJob(res.data);
        } catch (err) {
          console.error('Failed to fetch job:', err);
        }
      };
      fetchJob();
    }
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await api.put(`/admin/jobs/${id}`, job);
        alert('Listing updated.');
      } else {
        await api.post('/admin/jobs', job);
        alert('Listing created');
      }
      navigate('/');
    } catch (err) {
      console.error('Could not create listing:', err);
      alert('Hata oluştu.');
    }
  };

  return (
    <div className="admin-form-page">
      <h2>{isEditMode ? 'Updaye listing' : 'Create new listing'}</h2>
      <div className="form-grid">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={job.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={job.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Compamy"
          value={job.company}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={6}
          value={job.description}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {isEditMode ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default AdminJobFormPage;
