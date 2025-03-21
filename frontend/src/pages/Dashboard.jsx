import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PasswordList from '../components/PasswordList'; 
import axios from 'axios';
import '../index.css';

const getPasswordStrength = (password) => {
  if (password.length < 6) return 'Weak';
  if (password.length < 10) return 'Medium';
  return 'Strong';
};

const UserDashboard = () => {
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('User123');

  useEffect(() => {
    axios
      .get('http://localhost:8000/passwords')
      .then((response) => {
        setPasswords(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching passwords');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.trim() !== '') {
      const strength = getPasswordStrength(password);

      const newPassword = {
        password: password,
        strength: strength,
        username: username,
      };

      axios
        .post('http://localhost:8000/passwords', newPassword)
        .then((response) => {
          setPasswords([...passwords, response.data]);
          setPassword('');
        })
        .catch((err) => {
          setError('Error submitting password');
          console.error(err);
        });
    }
  };

  if (loading) {
    return <p>Loading your passwords...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-dashboard flex flex-col items-center bg-gradient-to-br from-blue-900 to-blue-800 min-h-screen py-10 px-4">
      <h2 className="text-4xl font-bold text-white mb-8">Your Submitted Weak Passwords</h2>

      <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-lg mb-8">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your weak password"
          className="w-full p-4 mb-4 rounded-lg border border-gray-400 bg-white/40 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
          Submit
        </button>
      </form>

      {passwords.length === 0 ? (
        <p className="text-white">No passwords submitted yet.</p>
      ) : (
        <PasswordList passwords={passwords} /> 
      )}

      <Link to="/leaderboard" className="mt-8 text-white text-lg font-semibold hover:underline">
        View Leaderboard
      </Link>
    </div>
  );
};

export default UserDashboard;
