import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patient/login', formData);
      if (response.data.success) {
        alert('Login successful');
        navigate('/patient-dashboard');
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };
  

  return (
    <div className="login-form">
      <h2>Patient Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          value={formData.patientId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/patient/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;