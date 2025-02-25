import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../../User/AuthProvider';
import toast from 'react-hot-toast';

const RequirementPost = () => {
  const auth = useAuth();
  console.log("Auth data is ", auth);
  const CurrentUserData = auth?.auth.userData;
  console.log("Full Data", CurrentUserData);

  const tarikh = new Date();
  const todayDate = tarikh.getDate();
  const month = tarikh.getMonth();
  const year = tarikh.getFullYear();

  const [userDetails, setUserDetails] = useState(CurrentUserData?.hasOwnProperty('_id') ? CurrentUserData._id : '');

  const [productService, setProductService] = useState('');
  const [superCategory, setSuperCategory] = useState('');
  const [description, setDescription] = useState('');
  const [postDate, setPostDate] = useState(new Date());

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setUserDetails(CurrentUserData?.hasOwnProperty('_id') ? CurrentUserData._id : '');
  }, [CurrentUserData]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataAll = new FormData();
      formDataAll.append("userDetails", userDetails);
      formDataAll.append("productService", productService);
      formDataAll.append("superCategory", superCategory);
      formDataAll.append("description", description);
      formDataAll.append("postDate", postDate);
    

      const res = await axios.post('http://localhost:5000/api/v1/createreqform', formDataAll, {
        headers: {
          'Content-Type': "application/json"
        }
      });
      console.log("Data is saved:", res.data);
      toast.success("Requirement posted successfully");

      setUserDetails('');
      setProductService('');
      setSuperCategory('');
      setDescription('');
      setPostDate(new Date());
      setErrorMessage('');
    } catch (error) {
      console.log("Error while fetching the data", error);
      if (error.response) {
        toast.error(error.response.data.error || 'Server Error');
        setErrorMessage(error.response.data.error || 'Server Error');
      } else if (error.request) {
        toast.error('No response from server');
        setErrorMessage('No response from server');
      } else {
        toast.error('Error submitting form');
        setErrorMessage('Error submitting form');
      }
    }
  }

  return (
    <div data-aos="fade-up" className='flex flex-col md:flex-row w-full'>
      <div className='bg-white w-full md:w-1/2'>
        <h2 className='text-lg font-medium text-center mt-10'>Get your <span className='text-green-700 font-bold text-xl'>Agri</span> Products in 3 easy steps</h2>
        <div className='flex flex-row mx-3 mt-10 mb-10 justify-center'>
          <section className='bg-gray-100 rounded-lg shadow-md px-2 mx-2'>
            <p className='font-bold text-xl text-yellow-600 mb-3 text-center'>Step 1</p>
            <div className='flex h-20 w-20 mb-3 justify-center'>
              <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717837810/etbcgqyddmhqbvswmdba.png' alt='user-post' />
            </div>
            <div className='pb-4'>
              <span className='text-yellow-700'>Post Anything you want</span>
            </div>
          </section>
          <section className='bg-gray-100 rounded-lg shadow-md px-2 mx-2'>
            <p className='font-bold text-xl text-yellow-600 mb-3 text-center'>Step 2</p>
            <div className='h-20 w-20 mb-3'>
              <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717837861/ptarnepaqcbn3utckciz.png' alt='seller-response' />
            </div>
            <span className='text-yellow-700'>Get Response from sellers</span>
          </section>
          <section className='bg-gray-100 rounded-lg shadow-md px-2 mx-2'>
            <p className='font-bold text-xl text-yellow-600 mb-3 text-center'>Step 3</p>
            <div className='h-20 w-20 mb-3'>
              <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717837914/zvoemnrrmhmy0juyiyxl.png' alt='contact' />
            </div>
            <span className='text-yellow-700'>Contact and make yours</span>
          </section>
        </div>
      </div>

      <div className='bg-white w-full md:w-1/2 mr-3'>
        <h2 className='text-xl font-medium text-center mt-10 mb-10'>Drop your <span className='text-green-700 font-bold text-xl'>Requirement</span> to different Agriculture Suppliers</h2>

        <div className='mb-10 shadow-lg p-2 bg-gray-200 border rounded-lg'>
          <form onSubmit={handleSubmit}>
          {/* <input
              type="text"
              name="superCategory"
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-80 px-4 py-3 border mx-2 my-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />

            <input
              type="number"
              name="superCategory"
              placeholder='Enter Phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-80 px-4 py-3 border mx-2 my-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            /> */}
            <input
              type="text"
              name="productName"
              placeholder='Product Name/Service Name'
              value={productService}
              onChange={(e) => setProductService(e.target.value)}
              required
              className="w-80 px-4 py-3 border mx-2 my-2 border-gray-100 rounded-md focus:outline-none focus:border-green-500"
            />

            {/* <input
              type="text"
              name="superCategory"
              placeholder='Input, Output, Agri-Service'
              value={superCategory}
              onChange={(e) => setSuperCategory(e.target.value)}
              required
              className="w-80 px-4 py-3 border mx-2 my-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            /> */}

            <select   className="w-80 px-4 py-3 border mx-2 my-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500" value={superCategory} onChange={(e) => setSuperCategory(e.target.value)}>
            <option disabled>Select</option>
              <option value="Input">Input</option>
              <option value="Output">Output</option>
              <option value="Agri Service">Agri Service</option>
            </select>

          


            <textarea
              type="text"
              name="description"
              placeholder='Describe about product/services'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-80 px-4 py-3 border mx-2 my-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />

            {errorMessage && (
              <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              type='submit'
              className='bg-green-700 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-100 hover:border border-green-900 hover:text-green-700 mb-5 mt-3 text-center'
            >
              Post Requirement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequirementPost;
