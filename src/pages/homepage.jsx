
import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';

const Homepage = ({token}) =>{
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ name: '', age: '' });
    const [user2, setUser2] = useState({ name: '', age: '' });
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => { 
      fetchUsers();
    }, []);
  
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data);
      }
    }
  


    function handleChange(event) {
      const { name, value } = event.target;
      setUser(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  
    function handleChange2(event) {
      const { name, value } = event.target;
      setUser2(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  
    async function createUser(event) {
      event.preventDefault();
      const { error } = await supabase
        .from('users')
        .insert({ name: user.name, age: user.age });
      if (error) {
        console.error('Error creating user:', error.message);
      } else {
        fetchUsers();
      }
      setUser({ name: '', age: '' });
    }
  
    async function updateUser(event) {
      event.preventDefault();
      
      if (!user.id) {
        console.error('User ID is undefined');
        return;
      }
      const { error } = await supabase
        .from('users')
        .update({ name: user2.name, age: user2.age })
        .eq('id', user.id);
      if (error) {
        console.error('Error updating user:', error.message);
      } else {
        fetchUsers();
      }
      setUser2({ name: '', age: '' });
    }
    
  
    function displayUser(userId) {
      const foundUser = users.find(user => user.id === userId);
      if (foundUser) {
        setUser2({ id: foundUser.id, name: foundUser.name, age: foundUser.age });
        setUser({ id: foundUser.id, name: foundUser.name, age: foundUser.age });
      } else {
        console.error('User not found');
      }
    }
    
    
  
    async function deleteUser(userId) {
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      if (error) {
        console.error('Error deleting user:', error.message);
      } else {
        fetchUsers();
      }
      if (data) {
        console.log(data);
      }
    }
  
    // 搜尋條件
    const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    let navigate = useNavigate()
    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }
    return (
      <div className="container">
        <h1>Final Project</h1>
        {/* 搜尋 */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        <form onSubmit={createUser} className="form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
          <button type="submit" className="btn">Create</button>
        </form>
  
        <form onSubmit={updateUser} className="form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user2.name}
            onChange={handleChange2}
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={user2.age}
            onChange={handleChange2}
          />
          <button type="submit" className="btn">Save Changes</button>
        </form>
  
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AGE</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)} className="btn btn-delete">Delete</button>
                  <button onClick={() => displayUser(user.id)} className="btn btn-edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}

export default Homepage;