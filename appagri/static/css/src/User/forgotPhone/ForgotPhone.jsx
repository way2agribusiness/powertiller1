import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ForgotPhone = () => {
  const navigate = useNavigate();

  // Use state to manage user details
  const [userDetails, setUserDetails] = useState({
    countryCode: "",
    phoneNo: ""
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const SignInButton = () => {
      // Create a script element
      const script = document.createElement('script');
      script.src = 'https://www.phone.email/sign_in_button_v1.js';
      script.async = true;
    
      document.body.appendChild(script);

      const phoneEmailListener = async (userObj) => {
        const { user_json_url, user_country_code, user_phone_number } = userObj;
        setIsAuthenticated(true);
        console.log("Phone number", user_phone_number)
        console.log("Country code", user_country_code)
        console.log("User json url", user_json_url);
        

        setUserDetails({
          countryCode: user_country_code,
          phoneNo: user_phone_number
        });
        console.log("User deatail in phone verified page:", userDetails)
        navigate('/resetpassword', { state: { user_phone_number, user_country_code } });
      };

      window.phoneEmailListener = phoneEmailListener;

    
      return () => {
        document.body.removeChild(script);
      };
    };

    SignInButton();

  }, []);

  return (
    <React.Fragment>
      {!isAuthenticated && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '50px 30px' }}>
            <div className="pe_signin_button" data-client-id="16031306208315887707"></div>  
        </div>
      )}
    </React.Fragment>
  );
};

export default ForgotPhone;
