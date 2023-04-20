import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import argon2 from 'argon2';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const storedUser = localStorage.getItem('user');
    const user = storedUser && JSON.parse(storedUser);

    if (user && user.username === username) {
      try {
        if (await argon2.verify(user.password, password)) {
          navigate('/home');
        } else {
          setError('Invalid password');
        }
      } catch (error) {
        setError('An error occurred while verifying your password. Please try again later.');
        console.error(error);
      }
    } else {
      setError('Invalid username');
    }
  }

  return (
    <div className="App">
      <div>
        {error && <p>{error}</p>}
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
        <a href="/register">Register</a>
      </div>
    </div>
  );
}

export default Login;
