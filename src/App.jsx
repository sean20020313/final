import React,{useState,useEffect} from 'react'
import { supabase } from './createClient'

const App =() =>{

  const [users,setUsers]=useState([])
  


  const [user,setUser]=useState({
    name:'',age:''
  })

  console.log(user)
  useEffect(()=>{
      fetchUsers()
  },[])


   async function fetchUsers(){
    const {data} = await supabase
    .from('users')
    .select('*')
    setUsers(data)
   }

  function handleChange(evevnt){
    
    setUser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:evevnt.target.value
      }
    })
  }

  async function createUser(){
     const { error } = await supabase
     .from('users')
     .insert({ name: user.name, age: user.age })
   }
  
   return (
    <div> 
    <form onSubmit={createUser}>
       <input 
       type="text" 
       placeholder="Name"
       name='name'
       onChange={handleChange}
       
       />

      <input 
       type="number" 
       placeholder="Age"
       name='age'
       onChange={handleChange}
       
       />
       <button type='sumbit'>Create</button>
    </form>



      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>AGE</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>
          <tr key={index}> 
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
          </tr>
        )}
        </tbody> 
      </table>
    </div>
  );
}

export default App