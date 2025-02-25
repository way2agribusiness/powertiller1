import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ForgotPhone from './forgotPhone/ForgotPhone';

const ForgotEmail = () => {

  return (
    <div className="flex justify-center items-center bg-gray-100 py-12 px-6 sm:px-8 lg:px-10">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
        <p className="mt-2 text-sm text-gray-600">Please verify your phone number to reset your password</p>
      </div>
      <div className="mt-8">
        <ForgotPhone />
      </div>
      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
          Remember Password?
        </Link>
      </div>
    </div>
  </div>
  );
}

export default ForgotEmail;
