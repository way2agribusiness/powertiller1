import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import OnFarmServiceAdd from './onfarm/OnFarmServiceAdd';
import OffFarmServiceAdd from './offfarm/OffFarmServiceAdd';
const AddAgriService = () => {
  const location = useLocation();
  const [onfarm, setOnFarm] = useState(true);
  const [ofFarm, setOfFarm] = useState(false);


  const { state } = location;
  const { vendorID } = state || {};

  const vendorIdFinal = state?.vendorID;
  const superCategoryFinal = state?.superCategory;

  const navigate = useNavigate();
  // console.log("Check the vendorID: ", vendorID)

  const handleAllProduct = () => {
    navigate('/seller-dashboard/products', );
  };

  const openTheOnFarm = () => {
    navigate('/seller-dashboard/add-agri-service/on-farm', {state: {vendorID: vendorID}})
    // setOnFarm(true);
    // setOfFarm(false); 
  };

  const openOffarm = () => {
    navigate('/seller-dashboard/add-agri-service/off-farm', {state: {vendorID: vendorID}})
    // setOfFarm(true);
    // setOnFarm(false);
  };

  return (
    <div>
      <button onClick={handleAllProduct} className="bg-green-500 text-white p-2 rounded">
        All Services
      </button>
      <div className="container mx-auto flex justify-center space-x-4 p-4">
        <div
          onClick={openTheOnFarm}
          className="relative w-1/2 h-64 rounded-lg shadow-lg transition-all duration-400 transform hover:h-72 hover:shadow-2xl cursor-pointer"
        >
          <div className="absolute inset-0 bg-onfarm bg-cover bg-center rounded-lg"></div>
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative h-full flex items-center justify-center text-white text-2xl font-bold">
            On-farm Service
          </div>
        </div>
        <div
          onClick={openOffarm}
          className="relative w-1/2 h-64 rounded-lg shadow-lg transition-all duration-400 transform hover:h-72 hover:shadow-2xl cursor-pointer"
        >
          <div className="absolute inset-0 bg-offfarm bg-cover bg-center rounded-lg"></div>
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative h-full flex items-center justify-center text-white text-2xl font-bold">
            Off-farm Service
          </div>
        </div>
      </div>
  

   
      {/* <div>{onfarm && <OnFarmServiceAdd vendorID = {vendorID}/>}</div>

      <div>{ofFarm && <OffFarmServiceAdd vendorID = {vendorID}/>}</div> */}
    </div>
  );
};

export default AddAgriService;
