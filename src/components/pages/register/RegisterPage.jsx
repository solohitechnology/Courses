import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './registerpage.css'
import { Helmet } from 'react-helmet';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSigningUp(true);

      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setIsSigningUp(false);
        window.location.href = '/login';
        alert('Registration successful. Please log in.');
      } else {
        setMessage('Registration failed. Please try again.');
        setIsSigningUp(false);
      }
    } catch (err) {
      console.log(err);
      setMessage('Registration failed. Please try again.');
      setIsSigningUp(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register at Ogendu Academy</title>
      </Helmet>
      <div className='parent_form'>
        <form className='registration-form' onSubmit={handleSubmit}>
          <h1>Register</h1>
          <br />
          <label htmlFor="name">Full Name</label>
          <input
            className='input-field'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            className='input-field'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className='input-field'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className='register-button' type="submit" disabled={isSigningUp}>
            {isSigningUp ? <CircularProgress size={24} /> : 'Register'}
          </button>

          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>

          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
