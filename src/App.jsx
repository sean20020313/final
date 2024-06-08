import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: '', age: '' });

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

  return (
    <div> 
      <h1>final project</h1>
      <form onSubmit={createUser}>
        <input 
          type="text" 
          placeholder="Name"
          name='name'
          value={user.name}
          onChange={handleChange}
        />
        <input 
          type="number" 
          placeholder="Age"
          name='age'
          value={user.age}
          onChange={handleChange}
        />
        <button type='submit'>Create</button>
      </form>

      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>AGE</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) =>
            <tr key={index}> 
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          )}
        </tbody> 
      </table>
    </div>
  );
}

export default App;
