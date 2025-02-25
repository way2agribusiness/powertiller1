import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PhoneVerified = () => {
    const navigate = useNavigate();

    // Use state to manage user details
    const [userDetails, setUserDetails] = useState({
        countryCode: "",
        phoneNo: ""
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  
    return (
        <React.Fragment>
            {!isAuthenticated && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '50px 30px' }}>
                    <div style={{ color: '#024430 !important', textAlign: 'center', backgroundColor: '#fff', padding: '30px', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(17, 24, 39, .09)', width: '100%', maxWidth: '420px', margin: '0 auto', fontFamily: 'sans-serif, serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif', lineHeight: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img className="phe-login-img" width="250px" src="https://storage.googleapis.com/prod-phoneemail-prof-images/phem-widgets/phe-signin-box.svg"
                            alt="phone email login demo" />
                        <h1 style={{ margin: "10px" }}>Welcome to Registration Step</h1>
                        <p style={{ color: "#a6a6a6" }} className="pb-4">Verify Phone Number</p>
                        <div className="pe_signin_button" data-client-id="19157132588860538605"></div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default PhoneVerified;
