import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './login.css'; // Make sure to import your external stylesheet
import { Helmet } from 'react-helmet';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSigningUp(true);

      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setIsSigningUp(false);
        window.location.href = '/';
        alert('Login successful');
      } else {
        setMessage('Invalid username or password');
        setIsSigningUp(false);
      }
    } catch (err) {
      console.log(err);
      setMessage('Invalid username or password');
      setIsSigningUp(false);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    alert('Forgot Password clicked');
  };

  return (

    <>
       <Helmet>
      <title> Sign In Ogendu Academy </title>
    </Helmet>
    <div className='parent_form'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <br />
        <label htmlFor="username">Username</label>
        <input
          className='input-field'
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <a className='sign-in-button' type="submit" disabled={isSigningUp}>
          {isSigningUp ? <CircularProgress size={24} /> : 'Sign In'}
        </a>
        <p >
          Click here to <a href="/register">Sign Up!</a>
        </p>
        <a className='forgot-password-link' onClick={handleForgotPasswordClick}>
          Forgot Password?
        </a>

        {message && <p>{message}</p>}
      </form>
    </div>
    
    </>
  );
};

export default LoginForm;
