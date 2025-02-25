import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 
import { jwtDecode }from 'jwt-decode'; 

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: '', 
    userData: null, 
  });

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        const { role, userId } = decoded; 

        setAuth({
          isAuthenticated: true,
          role,
          userData: null, 
        });

     
        const fetchUserData = async () => {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, 
            // `http://localhost:5000/api/v1/user/${userId}`,
             {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setAuth((prev) => ({
            ...prev,
            userData: response.data, 
          }));
        };

        fetchUserData(); 

      } catch (err) {
        console.error('Error decoding token or fetching user data:', err); 
      }
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
