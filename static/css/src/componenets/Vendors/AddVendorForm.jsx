import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../User/AuthProvider';
import states from '../../../src/Assests/Indian-state-name-districts.json';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Input } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SupplierAddressCard from './SupplierAddressCard/SupplierAddressCard';
import toast from 'react-hot-toast';

const AddVendorForm = () => {
  const { auth } = useAuth();
  const userId = auth.userData?._id;

  const [vendorName, setVendorName] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [address, setAddress] = useState({
    state: '',
    city: '',
    zip_code: '',
    // taluk: '',
    // village: '',
  });
  const [districtOptions, setDistrictOptions] = useState([]);
  const [supplierAddresses, setSupplierAddresses] = useState([]);
  const [newSupplierAddress, setNewSupplierAddress] = useState({
    state: '',
    city: '',
    zip_code: '',
    // taluk: '',
    // village: '',
  });
  const [supplierAlert, setSupplierAlert] = useState('')
  const [supplierDistrictOptions, setSupplierDistrictOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');


  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSupplierAddressChange = (e) => {
    const { name, value } = e.target;
    setNewSupplierAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSupplierAddress = () => {

    if (
      !newSupplierAddress.state ||
      !newSupplierAddress.city ||
      !newSupplierAddress.zip_code 
    ) {
      setSupplierAlert('Please fill in all required fields.');
      return;
    }

    setSupplierAddresses((prev) => [...prev, newSupplierAddress]);

    setNewSupplierAddress({
      state: '',
      city: '',
      zip_code: '',
      // taluk: '',
      // village: '',
    });
    setSupplierAlert('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      setSubmissionStatus('Error: User ID not found');
      return;
    }
  
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("vendor_name", vendorName);
    formData.append("vendor_type", vendorType);
  
    // Append address data
    formData.append("address[state]", address.state);
    formData.append("address[city]", address.city);
    formData.append("address[zip_code]", address.zip_code);
    // formData.append("address[taluk]", address.taluk);
    // formData.append("address[village]", address.village);
  
    // Correctly append supplier addresses


    supplierAddresses.forEach((supplierAddress, index) => {
      formData.append(`supplierAddresses[${index}][state]`, supplierAddress.state);
      formData.append(`supplierAddresses[${index}][city]`, supplierAddress.city);
      formData.append(`supplierAddresses[${index}][zip_code]`, supplierAddress.zip_code);
      // formData.append(`supplierAddresses[${index}][taluk]`, supplierAddress.taluk);
      // formData.append(`supplierAddresses[${index}][village]`, supplierAddress.village);
    });
  
  
    // Append images
    images.forEach((image) => {
      formData.append("images", image);
    });


    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/vendor`,formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", 
          },
        }
      );
      console.log("All the datas", response.data)
      setVendorName('')
      setVendorType('')
      setAddress({
        state: '',
        city: '',
        zip_code: '',
        // taluk: '',
        // village: '',
      })
      // setSupplierAddresses({
      //   state: '',
      //   city: '',
      //   zip_code: '',
      //   taluk: '',
      //   village: '',
      // })
  
      setImages([])
      setImagePreview([])
  
      setSubmissionStatus('Vendor profile created successfully');
      // getVendorByUserId(userId)
      // window.location.reload()

    } catch (error) {
      console.error('Error creating vendor profile:', error);
      if (error.response && error.response.status === 413) {
        toast.error('Payload too large. Maximum size is 1MB.');
      } else {
        toast.error(error.response?.data?.message || 'Unknown error occurred');
      }
    }
  
  };
  
  useEffect(() => {
    if (address.state && states[address.state]) {
      setDistrictOptions(states[address.state]);
    }
  }, [address.state]);


  useEffect(() => {
    if (newSupplierAddress.state && states[newSupplierAddress.state]) {
      setSupplierDistrictOptions(states[newSupplierAddress.state]);
    }
  }, [newSupplierAddress.state]);

  const handleDeleteSupplierAddress = (index) => {
    setSupplierAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
     
    <form

      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Complete your Vendor profile</h2>

      {/* Vendor name and type */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Vendor Name:</label>
        <input
          type="text"
          name="vendorName"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Vendor Type:</label>
        <select
          name="vendorType"
          value={vendorType}
          onChange={(e) => setVendorType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Farmer">Farmer</option>
          <option value="Input Manufacturer">Input Manufacturer</option>
          <option value="Service Provider">Agri Service Provider</option>
        </select>
      </div>

      {/* Main address */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Company/Home Address:</label>
        <div className="flex gap-2">

          <div className="w-1/2 mb-2">
            <label className="block text-gray-700">State <span className="text-red-500">*</span></label>
            <select
              name="state"
              value={address.state}
              required
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>
                Select State
              </option>
              {Object.keys(states).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 mb-2">
            <label className="block text-gray-700">City/District <span className="text-red-500">*</span></label>
            <select
              name="city"
              value={address.city}
              required
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>
                Select City
              </option>
              {districtOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          </div>

          <div className='flex gap-2'>
          <div className="w-1/2 mb-2">
            <label className="block text-gray-700">Zip Code <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="zip_code"
              value={address.zip_code}
              required
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>

          {/* <div className="w-1/2 mb-2">
            <label className="block text-gray-700">Taluk</label>
            <input
              type="text"
              name="taluk"
              
              value={address.taluk}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div> */}
          </div>

          {/* <div className="w-1/2">
            <label className="block text-gray-700">Vilage</label>
            <input
              type="text"
              name="village"
              value={address.village}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div> */}
        
      </div>

      {/* Supplier addresses */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Supplier Address:</label>
        <div className="flex gap-2 mb-2">
          <div className="w-1/2">
            <label className="block text-gray-700">State <span className="text-red-500">*</span></label>
            <select
              name="state"
              value={newSupplierAddress.state}
             
              onChange={(e) => {
                handleSupplierAddressChange(e);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>
                Select State
              </option>
              {Object.keys(states).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700">City/District <span className="text-red-500">*</span></label>
            <select
              name="city"
              value={newSupplierAddress.city}
              
              onChange={handleSupplierAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>
                Select City/District
              </option>
              {supplierDistrictOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
        <div className="w-1/2">
            <label className="block text-gray-700">Zip Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="zip_code"
              
              value={newSupplierAddress.zip_code}
              onChange={handleSupplierAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          {/* <div className="w-1/2">
            <label className="block text-gray-700">Taluk </label>
            <input
              type="text"
            
              name="taluk"
              value={newSupplierAddress.taluk}
              onChange={handleSupplierAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div> */}
        </div>

        {/* <div className="w-1/2 mb-4">
            <label className="block text-gray-700">Village</label>
            <input
              type="text"
              name="village"
              value={newSupplierAddress.village}
              onChange={handleSupplierAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div> */}
        
        <Button
          variant="contained"
          className="bg-green-500  text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleAddSupplierAddress}
        >
          Add
        </Button>
      </div>
      <SupplierAddressCard
        supplierAddresses={supplierAddresses}
        onDelete={handleDeleteSupplierAddress}
      />
        {supplierAlert && (
        <div className="mt-4 text-yellow-500">
          {supplierAlert}
        </div>
      )}

      {/* Image Upload */}
      <div className="mb-4">
        <Input
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: 'image/*' }}
          name="images"
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
            className="bg-green-500 text-white"
          >
            Upload Company Card
          </Button>
        </label>

        {imagePreview.map((image, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
            />
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: '10px' }}
              onClick={() => handleDeleteImage(index)}
              startIcon={<DeleteRoundedIcon />}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Submission Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Submit
      </Button>

      {/* Display submission status */}
      {submissionStatus && (
        <p className="mt-4 text-green-600">{submissionStatus}</p>
      )}

    </form>

    </div>
  );
};

export default AddVendorForm;