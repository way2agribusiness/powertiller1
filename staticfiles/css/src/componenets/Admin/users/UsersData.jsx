import React, {useState, useEffect} from 'react'
import axios from 'axios'
const UsersData = () => {
    const [users, setUsers] = useState([])
    const userData = async() => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
            setUsers(res.data)
            console.log(res.data)
        }
        catch(error)
        {
            console.log("Error while Fetching the users: ")
        }
    }
    useEffect(()=>{
        userData()
    },[])
    const handleDeleteUser = async (userId) => {
        
        const res = window.confirm('Are you sure want to delete')
        try {
            if(res)
                {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`); 
                    const updatedUsers = users.filter((user) => user._id !== userId);
                    setUsers(updatedUsers);
                }
        
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
  return (
    <div>
        <table className=" text-sm table-auto w-full">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase">
          <th className="px-4 py-2 text-left">Username</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
          <th className="px-4 py-2 text-left">Role</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user) => (
          <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-4 py-4">{user.username}</td>
            <td className="px-4 py-4">{user.email || ' '}</td>
            <td className="px-4 py-4">{user.phone}</td>
            <td className="px-4 py-4">{user.role}</td>
            <td className="px-4 py-4">
              <button
                className="px-2 py-1 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default UsersData