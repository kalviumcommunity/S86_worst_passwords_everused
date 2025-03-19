import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<UserDashboard />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
