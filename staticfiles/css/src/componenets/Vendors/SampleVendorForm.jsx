import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../User/AuthProvider';
import states from '../../../src/Assests/Indian-state-name-districts.json';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Input } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const AddVendorForm = () => {
  const { auth } = useAuth();
  const userId = auth.userData?._id;

  const [vendorName, setVendorName] = useState('');
  const [vendorType, setVendorType] = useState('');
  
  // Main address state
  const [address, setAddress] = useState({
    state: '',
    city: '',
    zip_code: '',
    area: '',
  });
  
  // State for available district options for the main address
  const [districtOptions, setDistrictOptions] = useState([]);

  // Supplier addresses
  const [supplierAddresses, setSupplierAddresses] = useState([]);
  const [newSupplierAddress, setNewSupplierAddress] = useState({
    state: '',
    city: '',
    zip_code: '',
    area: '',
  });

  // State for available district options for the supplier address
  const [supplierDistrictOptions, setSupplierDistrictOptions] = useState([]);

  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');

  // Handle changes in the main address
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes in the new supplier address
  const handleSupplierAddressChange = (e) => {
    const { name, value } = e.target;
    setNewSupplierAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new supplier address to the list
  const handleAddSupplierAddress = () => {
    setSupplierAddresses((prev) => [...prev, newSupplierAddress]);
    setNewSupplierAddress({
      state: '',
      city: '',
      zip_code: '',
      area: '',
    });
  };

  // Handle file uploads
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

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setSubmissionStatus('Error: User ID not found');
      return;
    }

    const formData = {
      vendorName,
      vendorType,
      address,
      supplierAddresses,
      images,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/vendor`,
        // 'http://localhost:5000/api/v1/vendor',
        {
          user_id: userId,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSubmissionStatus('Vendor profile created successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error adding vendor:', error);
      setSubmissionStatus(
        error.response?.data?.message || 'Unknown error occurred'
      );
    }
  };

  // Update district options when the main address state changes
  useEffect(() => {
    if (address.state && states[address.state]) {
      setDistrictOptions(states[address.state]);
    }
  }, [address.state]);

  // Update district options when the new supplier address state changes
  useEffect(() => {
    if (newSupplierAddress.state && states[newSupplierAddress.state]) {
      setSupplierDistrictOptions(states[newSupplierAddress.state]);
    }
  }, [newSupplierAddress.state]);

  return (
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
          <option value="Service Provider">Service Provider</option>
        </select>
      </div>

      {/* Main address */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Company/Home Address:</label>
        <div className="flex gap-2">
          <div className="w-1/3">
            <label className="block text-gray-700">State:</label>
            <select
              name="state"
              value={address.state}
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

          <div className="w-1/3">
            <label className="block text-gray-700">City/District:</label>
            <select
              name="city"
              value={address.city}
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

          <div className="w-1/3">
            <label className="block text-gray-700">Zip Code:</label>
            <input
              type="text"
              name="zip_code"
              value={address.zip_code}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
        </div>
      </div>

      {/* Supplier addresses */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Supplier Address:</label>
        <div className="flex gap-2">
          <div className="w-1/3">
            <label className="block text-gray-700">State:</label>
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

          <div className="w-1/3">
            <label className="block text-gray-700">City/District:</label>
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

          <div className="w-1/3">
            <label className="block text-gray-700">Zip Code:</label>
            <input
              type="text"
              name="zip_code"
              value={newSupplierAddress.zip_code}
              onChange={handleSupplierAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
        </div>
        
        {/* Button to add supplier address */}
        <Button
          variant="contained"
          color="primary"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          onClick={handleAddSupplierAddress}
        >
          Add Supplier Address
        </Button>
      </div>

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
  );
};

export default AddVendorForm;
