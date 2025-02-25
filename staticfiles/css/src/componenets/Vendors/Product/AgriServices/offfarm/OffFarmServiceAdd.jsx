import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const OffFarmServiceAdd = ({serviceNameFinal}) => {
  const location = useLocation();
  const {state} = location;
  const {vendorID} = state || {};
  const vendorIdFinal = state?.vendorID;
  
  const [formData, setFormData] = useState({
    vendor_id: vendorIdFinal,
    service_name: serviceNameFinal,
    service_type: 'Off-farm',
  });
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    desc:'',
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSpecsInput({...specsInput, desc: [e.target.value]})
    // console.log(e.target.value)
  };

  const addSpecs = () => {
    if (specs.length >= 7) {
      toast.error('Maximum number of specifications reached (7)');
      return;
    }
   setSpecs([...specs, specsInput]);
  //  console.log("Final Specificati is ", specs)
   setSpecsInput({desc: ''});
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((_,i)=> i !==index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // console.log("Specs Input Data", specs)

    try {
      const formDataDetails = new FormData();

      formDataDetails.append('vendor_id', formData.vendor_id);
      formDataDetails.append('service_name', formData.service_name);
      formDataDetails.append('service_type', formData.service_type);
      formDataDetails.append('service_location', formData.service_location);

      specs.forEach((spec, index)=> {
        formDataDetails.append(`specs[${index}][desc]`, spec.desc);
      })
      
      // console.log("All the FormData is ", formDataDetails);

      const response = await axios.post('http://localhost:5000/api/v1/offarm-service', formDataDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success("Off-farm Service Added !")
      setLoading(false);
      setFormData({
        vendor_id: vendorID,
        service_name: serviceNameFinal,
        service_type: 'Off-farm',
        service_location: '',
      })
      setSpecs([])
     
    } catch (error) {
      setLoading(false);
      toast.error("Error While Saving the Service!")
      setError(error.response.data.message);
    }
  };
  const serviceLocation = ["Near-Bengaluru", "South-Karnataka", "Entire-Karnataka", "AP-KA-Border", "TN-KA-Border"]
  return (
    <div className="container mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex flex-col mt-6'>
          <p className='text-gray-600 font-sm mb-3'>Add up to 7 distinctive specifications to showcase your uniqueness.</p>
          <label htmlFor='service_location' className='font-medium'>Specification</label>
          <input 
          className='py-3  px-2 mt-2 border border-green-300 rounded-md focus:outline-none focus:border-green-600 focus:bg-gray-100'
          name='specs'
          value={specsInput.desc}
          onChange={handleChange}
          placeholder='Enter specification'
          />
          <div className='mt-4'>
          <span onClick={()=> addSpecs()}
         className='inline-block py-2 px-2 bg-green-400 text-white text-center  rounded hover:shadow-lg cursor-pointer'
         >Add</span>

          </div>

        </div>

        <div className='flex flex-col gap-1.5 w-90'>
          {specs.map((specs, i)=> (
            <div key={i} className='flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2'>
              <p className=' font-medium'>{specs.desc}</p>
              <span
               onClick={() => deleteSpec(i)}
               className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer">
               <DeleteIcon/>
              </span>
            </div>
          ))}

        </div>
        <button
          type="submit"
          className={`bg-green-700 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'}`}
          disabled={loading}
        >
          {loading ? 'Adding Service...' : 'Add Service'}
        </button>
      </form>
    </div>
  );
};
export default OffFarmServiceAdd;