import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const registerUser = async () => {
    const response = await register(username, password, email);
    setMessage(response.message);
    if (response.success) {
      console.log('Registration successful, navigating to home');
      navigate('/'); // Navigate to home
    }
  };

  const loginUser = async () => {
    const response = await login(username, password);
    setMessage(response.message);
    if (response.success) {
      console.log('Login successful');
      navigate('/'); // Navigate to home
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? loginUser() : registerUser();
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!isLogin && (
          <>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginSignup;
