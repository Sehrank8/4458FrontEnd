import React, { useEffect, useState } from 'react';
import api from '../api';
import JobCard from '../components/JobCard';
import { useSearchParams } from 'react-router-dom';
import '../App.css';


const userId = '1';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: searchParams.get('title') || '',
    city: searchParams.get('city') || '',
    type: [],
  });

  const [workingTypes, setWorkingTypes] = useState(['Full-time', 'Part-time', 'Remote']);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.title) params.append('title', filters.title);
      if (filters.city) params.append('city', filters.city);
      if (filters.type.length) {
        filters.type.forEach(t => params.append('type', t));
      }

      const res = await api.get(`/jobs/search?${params.toString()}&userId=${userId}`);
      setJobs(res.data.content || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const toggleTypeFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
  };

  const clearFilter = (key, value) => {
    if (key === 'type') {
      setFilters(prev => ({
        ...prev,
        type: prev.type.filter(t => t !== value),
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: '',
      }));
    }
  };

  return (
    <div className="search-results-page">
      <aside className="filter-pane">
        <h4>Filter</h4>
        <div>
          <label>Working Type</label>
          {workingTypes.map(type => (
            <div key={type}>
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => toggleTypeFilter(type)}
              />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </aside>

      <main className="results-section">
        <h3>Search Results</h3>
        <div className="active-filters">
          {filters.title && (
            <span className="filter-badge">
              {filters.title}
              <button onClick={() => clearFilter('title')}>x</button>
            </span>
          )}
          {filters.city && (
            <span className="filter-badge">
              {filters.city}
              <button onClick={() => clearFilter('city')}>x</button>
            </span>
          )}
          {filters.type.map(type => (
            <span className="filter-badge" key={type}>
              {type}
              <button onClick={() => clearFilter('type', type)}>x</button>
            </span>
          ))}
        </div>

        {jobs.length === 0 ? (
          <p>Job not found.</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </main>
    </div>
  );
};

export default SearchResultsPage;
