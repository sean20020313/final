// src/SignUp.jsx
import React, { useState } from "react";
import { supabase } from "../createClient";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: '',
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
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullname,
          }
        }
      });
      if (error) {
        throw error;
      }
      alert('Check your email for verification link');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Sign Up</h1>
        <input  
          placeholder="Fullname"
          name='fullname'
          onChange={handleChange}
          value={formData.fullname}
        />
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
      Already have an account? <Link to='/'>Login</Link>
    </div>
  );
}

export default SignUp;
