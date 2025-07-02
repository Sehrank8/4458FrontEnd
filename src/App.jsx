import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import JobDetailPage from './pages/JobDetailPage';
import NotificationPage from './pages/NotificationPage';
import AdminJobFormPage from './pages/AdminJobFormPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import './index.css'
const isLoggedIn = !!localStorage.getItem('token');
const role = localStorage.getItem('role');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchResultsPage />
            </Layout>
          }
        />
        <Route
          path="/job/:id"
          element={
            <Layout>
              <JobDetailPage />
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout>
              <NotificationPage />
            </Layout>
          }
        />
        <Route
          path="/admin/job"
          element={
            isLoggedIn && role === 'ADMIN' ? (
              <Layout>
                <AdminJobFormPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/job/:id"
          element={
            isLoggedIn && role === 'ADMIN' ? (
              <Layout>
                <AdminJobFormPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
