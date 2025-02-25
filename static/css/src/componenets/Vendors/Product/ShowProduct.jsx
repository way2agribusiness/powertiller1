import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../User/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputProducts from './Input/InputProducts';
import OutputProducts from './Farmer/OutputProducts';
import AgriServiceProduct from './AgriServices/AgriServiceProduct';

const ShowProduct = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const currentUserData = auth.userData;
  const userID = currentUserData?._id;
  // console.log("auth auth auth auth === >  :", auth)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorType, setVendorType] = useState('');
  const [productExist, setProductExist] = useState(false);
  const [superCategory, setSuperCategory] = useState('');
  const [vendorID, setVendorID] = useState('');

  const [vendorStatus, setVendorStatus] = useState(false)
  const [productHovered, setProductHovered] = useState(false)

  const handleAddProduct = () => {
    if (vendorID && superCategory) {
      switch (superCategory) {
        case 'Input':
          navigate('/seller-dashboard/add-input-product', { state: { superCategory, vendorID } });
          break;
        case 'Output':
          navigate('/seller-dashboard/add-output-product', { state: { superCategory, vendorID } });
          break;
        case 'Agri-Service':
          navigate('/seller-dashboard/add-agri-service', { state: { superCategory, vendorID } });
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendor/${userID}`);
        if (response.data.vendor) {
          const vendor = response.data.vendor;
          setProductExist(!!vendor.productExist);
          setVendorID(vendor._id);
          setVendorType(vendor.vendor_type);
        }
        const vendorStatus = response.data.vendor.active
        setVendorStatus(vendorStatus)
      } catch (err) {
        console.error('Error fetching vendor data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchVendorData();
    }
  }, [userID]);

  useEffect(() => {
    switch (vendorType) {
      case 'Farmer':
        setSuperCategory('Output');
        break;
      case 'Input Manufacturer':
        setSuperCategory('Input');
        break;
      case 'Service Provider':
        setSuperCategory('Agri-Service');
        break;
      default:
        setSuperCategory('');
        break;
    }
  }, [vendorType]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>

          {vendorType === 'Service Provider' && (
            <button onClick={handleAddProduct}
              className={`p-2 rounded ${vendorStatus ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              disabled={!vendorStatus}
            >
              Add Agri Service
            </button>

          )}

          {vendorType === 'Farmer' && (
            <>
           
              <button onClick={handleAddProduct}
                className={`p-2 rounded ${vendorStatus ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                disabled={!vendorStatus}
              >
                Add Output Product
              </button>
            </>

          )}

          {vendorType === 'Input Manufacturer' && (
            <>
           
            <button
              onClick={handleAddProduct}
              className={`p-2 rounded ${vendorStatus ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              disabled={!vendorStatus}
              onMouseEnter={()=> setProductHovered(true)}
              onMouseLeave={() => setProductHovered(true)}
              
            >
              Add Input Product
            </button>
            </>
            
          )}
          <div className="overflow-x-auto">
            {vendorType === 'Farmer' && <OutputProducts vendorStatus={vendorStatus} vendorType={vendorType} productExist={productExist} vendorID={vendorID} />}
            {vendorType === 'Input Manufacturer' && <InputProducts vendorStatus={vendorStatus} vendorType={vendorType} productExist={productExist} vendorID={vendorID} />}
            {vendorType === 'Service Provider' && <AgriServiceProduct vendorStatus={vendorStatus} vendorType={vendorType} productExist={productExist} vendorID={vendorID} />}
          </div>

        </div>
      )}
    </div>
  );
};

export default ShowProduct;
