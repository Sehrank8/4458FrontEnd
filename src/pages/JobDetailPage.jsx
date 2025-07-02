import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import JobCard from '../components/JobCard';
import '../App.css';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const navigate = useNavigate();

  const userId = 'user123';

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await api.get(`/job-posting/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await api.get(`/job-posting/related/${id}`);
        setRelatedJobs(res.data || []);
      } catch (err) {

      }
    };

    fetchJobDetail();
    fetchRelated();
  }, [id]);

  const handleApply = () => {
    if (!userId) {
      navigate('/login');
    } else {
      alert('Applied (mock).');
      // Ideally, you'd post to a /apply endpoint
    }
  };

  if (!job) return <p>Listings loading...</p>;

  return (
    <div className="job-detail-container">
      <div className="main-detail">
        <h2>{job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>City:</strong> {job.city}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Updated:</strong> {new Date(job.lastUpdated).toLocaleDateString()}</p>
        <p><strong>Applied job count:</strong> {job.applicationCount || 0}</p>
        <button onClick={handleApply}>Apply</button>
      </div>

      <div className="related-jobs">
        <h3>İlgili İlanlar</h3>
        {relatedJobs.length > 0 ? (
          relatedJobs.map(j => <JobCard key={j.id} job={j} />)
        ) : (
          <p>Job listing not found</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
