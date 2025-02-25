import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AOS from 'aos'
import 'aos/dist/aos.css';

const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { user_phone_number, user_country_code } = location.state || {};


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(user_phone_number)
  const [password, setPassword] = useState('');
  const [city, setCityName] = useState('');
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNotExisted, setPhoneNotExisted] = useState(false)
  const [userDetails, setUserDetails] = useState({
    countryCode: "",
    phoneNo: "",
  })
  const redirectTo = location.state?.redirectTo || '/';

  useEffect(() => {
    AOS.init()
  }, [])
  
  useEffect(() => {
    const SignInButton = () => {
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
        setPhone(user_phone_number)
        verifyPhoneNumber(user_phone_number);

      };
      window.phoneEmailListener = phoneEmailListener;
      return () => {
        document.body.removeChild(script);
      };
    };
    SignInButton();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'role':
        setRole(value);
        break;
      default:
        console.warn(`Unknown form field: ${name}`);
    }
  };

  const verifyPhoneNumber = async (phone) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/verify-phone`, { phone }, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Phone number existence check:", res.data.message);

      if (res.status === 201) {
        setPhoneNotExisted(false);
      } else if (res.status === 200) {
        setPhoneNotExisted(true);
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error occurred';
      toast.error(errorMessage);
      console.log(`Verification Error: ${errorMessage}`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('phone', phone)
    formData.append('city', city);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        // 'http://localhost:5000/api/v1/signup',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );  

      setUsername('');
      setEmail('');
      setPassword('');
      setRole('');
      setPhone('');

      // navigate('/login', { state: { phone, password } });
      handleLoginAfterRegister()
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.error('Registration error:', error.response?.data?.message || 'Unknown error occurred');
    }
  };

  const handleLoginAfterRegister = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {phone, password});
      const { token } = response.data;
      localStorage.setItem('token', token);

      // setFormData({
      //   phone: '',
      //   password: '',
      // });
      toast.success("Welcome to KAB !!")
      navigate(redirectTo);
      window.location.reload();

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error occurred';
      console.error('Login error:', errorMessage);
      toast.error(errorMessage);
    }
  };
  return (
    <div  className="flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {!isAuthenticated && (
        <div  data-aos="fade-up"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '50px 30px' }}>
          <div style={{ color: '#024430 !important', textAlign: 'center', backgroundColor: '#fff', padding: '30px', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(17, 24, 39, .09)', width: '100%', maxWidth: '420px', margin: '0 auto', fontFamily: 'sans-serif, serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif', lineHeight: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img className="phe-login-img" width="250px" src="https://res.cloudinary.com/dq7vggsop/image/upload/v1719464285/jqz80kzevq3cavjxuork.jpg"
              alt="phone email login demo" />
            <h1 style={{ margin: "10px" }}>Welcome to Registration Step</h1>
            <p style={{ color: "#a6a6a6" }} className="pb-4">Verify Phone Number</p>
            <div className="pe_signin_button" data-client-id="16031306208315887707"></div>
          </div>

          <div className="flex flex-col items-center justify-center p-5 text-center">
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => navigate('/login')}
                >
                <span
                className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                >
                Login
                </span>
              </button>
              <button
                onClick={() => navigate('/forgot-password')}
              >
                <span 
                className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                >
                Forgot Password
                </span>
              </button>
            </div>
          </div>

        </div>
      )}

      {isAuthenticated && !phoneNotExisted && (
        <div  data-aos="fade-up"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <img
            src="https://res.cloudinary.com/dq7vggsop/image/upload/v1718864963/bvwnqyvwn9o7uvgsezcr.jpg" // Replace with an actual illustration URL
            alt="Phone number already exists"
            style={{ width: '200px', marginBottom: '20px' }}
          />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Phone Number Already Registered</h2>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>It looks like this phone number is already associated with an existing account. Please log in or use the forgot password feature if you need to reset your password.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/forgot-password')}
              style={{ padding: '10px 20px', backgroundColor: '#FF5722', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Forgot Password
            </button>
          </div>
        </div>
      )}

      {isAuthenticated && phoneNotExisted && (
       <div  data-aos="fade-up"  className="flex justify-center items-center  py-10 px-6 sm:px-6 lg:px-4">
       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
         <div>
           <h2 className="text-3xl font-extrabold text-gray-900 text-center">
             Create a new account
           </h2>
           <p className="mt-2 text-center text-sm text-gray-600">
             Already have an account?{' '}
             <Link
               to="/login"
               className="font-medium text-indigo-600 hover:text-indigo-500 underline"
             >
               Login here
             </Link>
           </p>
         </div>
         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
           <div className="space-y-1">
             <label
               htmlFor="username"
               className="block text-sm font-medium text-gray-700"
             >
               Full Name
             </label>
             <input
               id="username"
               name="username"
               type="text"
               required
               value={username}
               onChange={handleChange}
               className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
               placeholder="First Middle Last"
             />
           </div>
           <div className="space-y-1">
             <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700"
             >
               Email address (optional)
             </label>
             <input
               id="email"
               name="email"
               type="email"
               value={email}
               onChange={handleChange}
               className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
               placeholder="you@site.com"
             />
           </div>
           <div className="space-y-1">
             <label
               htmlFor="password"
               className="block text-sm font-medium text-gray-700"
             >
               Password
             </label>
             <input
               id="password"
               name="password"
               type="password"
               required
               value={password}
               onChange={handleChange}
               className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
               placeholder="Password"
             />
           </div>
           <div className="space-y-1">
             <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700"
             >
               City
             </label>
             <input
               id="city"
               name="city"
               type="text"
               value={city}
               onChange={(e) => setCityName(e.target.value)}
               className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
               placeholder="City name"
             />
           </div>
           <div className="space-y-1">
             <label
               htmlFor="role"
               className="block text-sm font-medium text-gray-700"
             >
               Role
             </label>
             <select
               id="role"
               name="role"
               value={role}
               onChange={handleChange}
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
             >
               <option value="buyer">Buyer</option>
               <option value="vendor">Vendor</option>
               {/* <option value="admin">Admin</option> */}
             </select>
           </div>
           <div className="mt-4">
             <button
               type="submit"
               className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
             >
               Register
             </button>
           </div>
         </form>
       </div>
     </div>

      )}
    </div>
  );
};

export default Register;
