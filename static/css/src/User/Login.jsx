import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AOS from 'aos'
import 'aos/dist/aos.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';
  const [formData, setFormData] = useState({
    phone: location.state?.phone || '',
    password: location.state?.password || '',
  });
  console.log("Phone nummer is", formData.phone)
  console.log("Password is", formData.password)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    AOS.init()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
      const { token } = response.data;
      localStorage.setItem('token', token);

      setFormData({
        phone: '',
        password: '',
      });
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
    <div data-aos="fade-up" className="flex justify-center items-center bg-gray-100 py-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Log in to your account</h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 underline">
              Register here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autocomplete="off"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="off"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
