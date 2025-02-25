import React from 'react'
import { useAuth } from '../../../User/AuthProvider';
import { format } from 'date-fns';
const UserInfoTable = () => {
    const {auth} = useAuth();
    const name = auth.userData
    console.log("Current user data is ", name)
  
    const { username, phone, role,city, vendor_profile_exist, created_at } = auth.userData;
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse', 
      };
    
      const thStyle = {
        textAlign: 'left',
        fontSize: '1.1em', 
        padding: '10px', 
        backgroundColor: '#f2f2f2', 
      };
    
      const tdStyle = {
        padding: '10px', 
        border: '1px solid #ddd',
        fontSize: '1em', 
        color: '#333',
      };
      const formattedData = format(new Date(created_at), 'do MMMM yyyy'); 
      const formattedTime = new Date(created_at).toLocaleTimeString();
  return (
    <div>
        <h2 style={{fontSize: '1.5rem', color:'#444', marginBottom:'10px'}}>
            User Information
        </h2>
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th>Feild</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
          <tr>
            <td style={tdStyle}>Username</td>
            <td style={tdStyle}>{username}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Phone</td>
            <td style={tdStyle}>{phone}</td>
          </tr>
          <tr>
            <td style={tdStyle}>City</td>
            <td style={tdStyle}>{city}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Role</td>
            <td style={tdStyle}>{role}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Created At</td>
            <td style={tdStyle}>{`${formattedData} , ${formattedTime}`}</td>
          </tr>
        </tbody>

        </table>

    </div>
  )
}

export default UserInfoTable