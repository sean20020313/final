import React, { useState } from "react";
import { supabase } from "../createClient";
import { Link , useNavigate} from 'react-router-dom';

const Login = () => {
  let navigate=useNavigate()

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
      console.log(data)
      navigate('./homepage')
      //alert('Check your email for verification link');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input  
          placeholder="Email"
          name='email'
          onChange={handleChange}
        />
        <input  
          placeholder="Password"
          name='password'
          type='password'
          onChange={handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
      Already have an account? <Link to='/signup'>Sign Up</Link>
    </div>
  );
}

export default Login;
