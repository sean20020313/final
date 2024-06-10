// src/Login.jsx
import React, { useState } from "react";
import { supabase } from "../createClient";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        throw error;
      }
      navigate('/homepage');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Login</h1>
        <input  
          placeholder="Email"
          name='email'
          onChange={handleChange}
          value={formData.email}
        />
        <input  
          placeholder="Password"
          name='password'
          type='password'
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit" className="btn">Submit</button>
      </form>
      Don't have an account? <Link to='/signup'>Sign Up</Link>
    </div>
  );
}

export default Login;
