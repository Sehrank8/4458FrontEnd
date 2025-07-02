import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import JobCard from '../components/JobCard';
import ChatAgent from '../components/ChatAgent';
import '../App.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState('');
  const [city, setCity] = useState('');
  const [jobs, setJobs] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showAgent, setShowAgent] = useState(false);

  const userId = 'user123'; // replace with real user if available

  useEffect(() => {
    const fetchCityJobs = async () => {
      try {
        const cityFromBrowser = 'izmir'; // or detect using geolocation
        const res = await api.get(`/jobs/city?city=${cityFromBrowser}`);
        setJobs(res.data.content);
        setCity(cityFromBrowser);
      } catch (err) {
        console.error('City job fetch error:', err);
      }
    };

    const fetchSearchHistory = async () => {
      try {
        const res = await api.get(`/jobs/history?userId=1`);
        setRecentSearches(res.data);
      } catch (err) {
        console.error('Search history error:', err);
      }
    };

    fetchCityJobs();
    fetchSearchHistory();
  }, []);

  const handleSearch = () => {
    navigate(`/search?title=${position}&city=${city}`);
  };

  return (
    <div>
      <h2>Find Job</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Title"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <button onClick={() => setShowAgent(!showAgent)}>🤖 Chat Agent</button>

      <section>
  <h3>Recent Searches</h3>
  {recentSearches.length === 0 ? (
    <p>No recent searches.</p>
  ) : (
    <ul className="recent-searches-list">
      {recentSearches.map((item, index) => (
        <li
          key={index}
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            navigate(`/search?title=${item.title}&city=${item.city}`);
          }}
        >
          {item.title} in {item.city}
        </li>
      ))}
    </ul>
  )}
</section>


      <section>
        <h3>{city} Jobs</h3>
        {jobs.slice(0, 5).map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>

      {showAgent && <ChatAgent />}
    </div>
  );
};

export default HomePage;
