import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_phone_number, user_country_code } = location.state || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitResetPass = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`,
        // "http://localhost:5000/api/v1/forgot-password",
         {
        phone: user_phone_number,
        password
      });

      toast.success("Password has been changed successfully");
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Create new password</h2>
    <form
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center"
      onSubmit={handleSubmitResetPass}
    >
      <div className="mb-4 w-full">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Reset Password
      </button>
    </form>
    <div className="flex justify-between mt-4 w-full max-w-md">
      <Link to="/register" className="text-blue-500 hover:underline">
        Don't have an account?
      </Link>
      <Link to="/forgot-password" className="text-blue-500 hover:underline">
        Forgot Password?
      </Link>
    </div>
    <div className="mt-5 text-center">
      <Link to="/" className="text-blue-500 hover:underline">
        Back to home
      </Link>
    </div>
  </div>
  );
};

export default ForgotPassword;
