import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div className="job-card" onClick={handleClick}>
      <h4>{job.title}</h4>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>City:</strong> {job.city}</p>
      <p><strong>Updated:</strong> {new Date(job.lastUpdated).toLocaleDateString()}</p>
    </div>
  );
};

export default JobCard;
