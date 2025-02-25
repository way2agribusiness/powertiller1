import React from 'react';
import {format} from 'date-fns'
const VendorInformationTable = ({ username, phone, role, vendor_profile_exist, created_at }) => {
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
      <h2 style={{ fontSize: '1.5em', color: '#444', marginBottom: '10px' }}>
        Vendor Profile Information
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Field</th>
            <th style={thStyle}>Value</th>
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
            <td style={tdStyle}>Role</td>
            <td style={tdStyle}>{role}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Status</td>
            <td style={tdStyle}>{vendor_profile_exist ?  <p className='text-green-600'>Active</p> : <p className='text-red-700'>Not Active</p>}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Created At</td>
            <td style={tdStyle}>{`${formattedData} , ${formattedTime}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VendorInformationTable;
