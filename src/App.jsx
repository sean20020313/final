import React,{useState,useEffect} from 'react'
import { supabase } from './createClient'

const App =() =>{

  const [users,setUsers]=useState([])
  console.log(users)

  useEffect(()=>{
      fetchUsers()
  },[])


   async function fetchUsers(){
    const {data} = await supabase
    .from('users')
    .select('*')
    setUsers(data)
    console.log(data)
   }

   return (
    <div> 
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