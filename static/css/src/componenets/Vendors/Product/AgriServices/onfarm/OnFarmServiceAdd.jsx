import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import toast from 'react-hot-toast';
import { constructFrom } from 'date-fns';

const OnFarmServiceForm = ({ serviceNameFinal }) => {
  const location = useLocation();
  const { state } = location;
  const { vendorID } = state || {};

  const vendorIdFinal = state?.vendorID;
  const superCategoryFinal = state?.superCategory;

  // console.log("Vendor ID:", vendorIdFinal)
  const [formData, setFormData] = useState({
    vendor_id: vendorIdFinal,
    service_name: serviceNameFinal,
    service_type: 'On-farm',
    service_desc: [], 
  });
  const [service_location, setServiceLocation] = useState('')
  const [serviceLocationArray,setServiceLocationArray] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otherCategory, setOtherCategory] = useState('');
  const [otherIsOpen, setOtherOpen] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleLocationChange = (e) => {
    e.preventDefault();
    setServiceLocation(e.target.value)
  }

  const handleLocationAdd = (e) => {
    e.preventDefault();
    console.log("E target values", e.target.value)
    console.log("Service Location is ", service_location)
    if (service_location.trim()) {
      if (serviceLocationArray.includes(service_location)) {
        toast.error("Location already added");
      } else {
        setServiceLocationArray((prevArra) => [...prevArra, service_location]);
      }
      setServiceLocation('')
    }
  };
  

  const handleDeleteImage = (index) => {
    setImagesPreview((oldImages) => oldImages.filter((_, i) => i !== index));
    setImages((oldImages) => oldImages.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === 'other') {
      setOtherOpen(!otherIsOpen)
    }
    const isChecked = e.target.checked;
    setFormData((prevData) => {
      const newServiceDesc = isChecked ? [...prevData.service_desc, { service: category }] : prevData.service_desc.filter((desc) => desc.service !== category);
      // console.log(category);
      return { ...prevData, service_desc: newServiceDesc };
    })
  }

  const handleOtherCategoryChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setOtherCategory(value);
    setFormData((prevData) => {
      const updatedServiceDesc = prevData.service_desc.filter(
        (desc) => !desc.service.endsWith('other: ')
      );

      if (value) {
        updatedServiceDesc.push({ service: `other: ${value}` });
      }

      return { ...prevData, service_desc: updatedServiceDesc };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Service location is ",serviceLocationArray);
    console.log("All the data",formData)
    if (formData.service_desc.length === 0 || images.length === 0) {
      toast.error(!service_location ? "Location is missing" : formData.service_desc.length === 0 ? "Select at least one option" : "Image is missing");
      setLoading(false);
      return;
    }

    try {
      const formDataAll = new FormData();
      formDataAll.append('vendor_id', formData.vendor_id);
      formDataAll.append('service_name', formData.service_name);
      formDataAll.append('service_type', formData.service_type);

      formData.service_desc.forEach((desc, index) => {
        formDataAll.append(`service_desc[${index}]`, desc.service);
      });

      serviceLocationArray.forEach((location, index) => {
        formDataAll.append(`service_location[${index}]`, location);
      });

        images.forEach((image) => {
          formDataAll.append("images", image);
        });

        console.log("Data is coming", ...formDataAll)
      const response = await axios.post('http://localhost:5000/api/v1/onfarm-service', formDataAll, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      toast.success("Service Added Successfully");
      setFormData({
        vendor_id: vendorIdFinal,
        service_name: serviceNameFinal,
        service_type: 'On-farm',
        service_desc: [],
      });
      setOtherCategory('')
      setImages([]);
      setServiceLocation('')
      setImagesPreview([]);
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  // const handleSubmit2 = async(e)=> {
  //   e.preventDefault();
  //   setLoading(true)
  //   setError(null)
  //   try{
  //     const formDataAll = new FormData();
  //     formDataAll.append("vendor_id", formData.vendor_id);
  //     formDataAll.append('service_name', formData.service_name);
  //     formDataAll.append("service_type",formData.service_type);

  //     formData.service_desc.forEach((desc) => {
  //       formDataAll.append('service_desc', desc.service);
  //     });

  //     images.forEach((image) => {
  //       formDataAll.append("images", image);
  //     });

  //     serviceLocationArray.forEach((location)=> {
  //       formDataAll.append("service_location", location)
  //     })
  //     console.log("formData all the data", ...formDataAll)


  //   }
  //   catch(err)
  //   {
  //     setLoading(false)
  //     const errorMessage = err.response?.data?.message || "An error occurred";
  //     toast.error(errorMessage)
  //     setError(errorMessage)
  //   }

  // }
  // const handleLocationRemove = (idToRemove) => {
  //   // This function removes a location from the list of locations
  //   setServiceLocationArray((currentLocations) => {
  //     // `currentLocations` is the current array of locations
  //     const updatedLocations = []; // Create an empty array to store updated locations
  
  //     // Loop through each location in the current array
  //     currentLocations.forEach((location, index) => {
  //       // Check if the current location is not the one we want to remove
  //       if (index !== idToRemove) {
  //         updatedLocations.push(location); // Add the location to the updated array
  //       }
  //     });
  
  //     return updatedLocations; // Return the new array without the removed location
  //   });
  // };
  
  const handleLocationRemove = (idToRemove) => {
    // This function removes a location from the list of locations
    setServiceLocationArray((currentLocations) => {
      // Filter out the location to remove based on its index
      const updatedLocations = currentLocations.filter((location, index) => index !== idToRemove);
      return updatedLocations; // Return the new array without the removed location
    });
  };
  

  // const handleLocationRemove = (id) =>{
  //   setServiceLocationArray((prevArray)=>{
  //     const newArray = prevArray.filter((_, index)=> index != id)
  //     return newArray;
  //   })
  // }

  const serviceLocation = ["Near-Bengaluru", "South-Karnataka", "Entire-Karnataka", "AP-KA-Border", "TN-KA-Border"]

  // console.log("Current Service Location data: ", serviceLocationArray);


  return (
    <div className="mx-auto h-80 overflow-scroll">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex flex-col mt-6">
          <label htmlFor="service_location" className="font-medium">
            Service Location
          </label>
          <div className='flex flex-row '>
          <select
            name="service_location"
            value={service_location}
            onChange={handleLocationChange}
            className="border border-gray-300 p-2 rounded w-60"
          >
            <option value="" disabled>Select location</option>
            {serviceLocation.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          <div className='pl-6'>
          <button  className=' py-2 px-4 bg-orange-500 text-white rounded-md' onClick={handleLocationAdd}>Add</button>
          </div>

          </div>
        
      

          {serviceLocationArray && serviceLocationArray.map((location, index)=> (
            <div key={index}>
              <div className=''>  <span className='text-xs'>{location}</span>
              <span className='text-xs pl-10 text-red-600 cursor-pointer' onClick={() => handleLocationRemove(index)}>Remove</span> </div>
             
             </div>
          ))}
        </div>

        {serviceNameFinal === 'Crop Type' && (
          <div className="flex flex-col">
            <label htmlFor="service_desc" className="font-medium">
              Select for {serviceNameFinal} type
            </label>
            <fieldset className='mt-1'>
              <div>
                <div>
                  <input
                    type='checkbox'
                    name='category'
                    id='vegetables'
                    value="vegetables"
                    checked={formData.service_desc.some((desc) => desc.service === 'vegetables')}
                    onChange={handleCategoryChange}
                  />
                  <lable htmlFor="vegetables" className="ml-2">Vegetables</lable>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='fruits'
                    id="fruits"
                    value="fruits"
                    checked={formData.service_desc.some((desc) => desc.service === 'fruits')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='fruits' className='ml-2'>Fruits</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='flowers'
                    value="flowers"
                    checked={formData.service_desc.some((desc) => desc.service === 'flowers')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='flowers' className='ml-2'>Flowers</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Perennial-crops'
                    value="Perennial-crops"
                    checked={formData.service_desc.some((desc) => desc.service === 'Perennial-crops')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='flowers' className='ml-2'>Perennial crops</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='other'
                    value="other"
                    checked={formData.service_desc.some((desc) => desc.service.startsWith('other: '))}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='other' className='ml-2'>Other</label>
                </div>
              </div>

              {formData.service_desc.some((desc) => desc.service === 'other') && otherIsOpen && (
                <div className='mt-2 mb-2'>
                  <textarea
                    id='other'
                    name='other'
                    className='shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:
                  dark:text-gray-300 p-2'
                    value={otherCategory}
                    onChange={handleOtherCategoryChange}
                    placeholder='Specify other crop type'
                  />
                </div>
              )}
            </fieldset>
          </div>
        )}

        {serviceNameFinal === 'Farm Size' && (
          <div className="flex flex-col">
            <label htmlFor="service_desc" className="font-medium">
              Select for {serviceNameFinal}
            </label>
            <fieldset className='mt-1'>
              <div>

                <div>
                  <input
                    type='checkbox'
                    name='bigfarm'
                    id='bigfarm'
                    value="Big-farm"
                    checked={formData.service_desc.some((desc) => desc.service === 'Big-farm')}
                    onChange={handleCategoryChange}
                  />
                  <lable htmlFor="bigfarm" className="ml-2">Big Farm</lable>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='mediumfarm'
                    value="Medium-farm"
                    checked={formData.service_desc.some((desc) => desc.service === 'Medium-farm')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='mediumfarm' className='ml-2'>Medium Farm</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='smallfarm'
                    id="smallfarm"
                    value="Small-farm"
                    checked={formData.service_desc.some((desc) => desc.service === 'Small-farm')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='smallfarm' className='ml-2'>Small Farm</label>
                </div>

              </div>

            </fieldset>
          </div>
        )}

        {serviceNameFinal === 'Cultivation Type' && (
          <div className="flex flex-col">
            <label htmlFor="service_desc" className="font-medium">
              Select for {serviceNameFinal} type
            </label>
            <fieldset className='mt-1'>
              <div>
                <div>
                  <input
                    type='checkbox'
                    name='Open-cultivation'
                    id='Open-cultivation'
                    value="Open-cultivation"
                    checked={formData.service_desc.some((desc) => desc.service === 'Open-cultivation')}
                    onChange={handleCategoryChange}
                  />
                  <lable htmlFor="Open-cultivation" className="ml-2">Open cultivation</lable>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Greenhouse'
                    id="Greenhouse"
                    value="Greenhouse"
                    checked={formData.service_desc.some((desc) => desc.service === 'Greenhouse')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Greenhouse' className='ml-2'>Greenhouse</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='other'
                    value="other"
                    checked={formData.service_desc.some((desc) => desc.service.startsWith('other: '))}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='other' className='ml-2'>Other</label>
                </div>
              </div>

              {formData.service_desc.some((desc) => desc.service === 'other') && otherIsOpen && (
                <div className='mt-2 mb-2'>
                  <textarea
                    id='other'
                    name='other'
                    className='shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:
                   dark:text-gray-300 p-2'
                    value={otherCategory}
                    onChange={handleOtherCategoryChange}
                    placeholder='Specify other cultivation type'
                  />
                </div>
              )}
            </fieldset>
          </div>
        )}

        {serviceNameFinal === 'Service Type' && (
          <div className="flex flex-col">
            <label htmlFor="service_desc" className="font-medium">
              Select for {serviceNameFinal}
            </label>
            <fieldset className='mt-1'>
              <div>

                <div>
                  <input
                    type='checkbox'
                    name='Farm-Management'
                    id='Farm-Management'
                    value="Farm-Management"
                    checked={formData.service_desc.some((desc) => desc.service === 'Farm-Management')}
                    onChange={handleCategoryChange}
                  />
                  <lable htmlFor="Farm-Management" className="ml-2">Farm-Management</lable>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Crop-selection'
                    value="Crop-selection"
                    checked={formData.service_desc.some((desc) => desc.service === 'Crop-selection')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Crop-selection' className='ml-2'>Crop-selection</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Nutrients-pests'
                    id="Nutrients-pests"
                    value="Nutrients-pests"
                    checked={formData.service_desc.some((desc) => desc.service === 'Nutrients-pests')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Nutrients-pests' className='ml-2'>Nutrients-pests</label>
                </div>
              </div>

            </fieldset>
          </div>
        )}

        {serviceNameFinal === 'Irrigation' && (
          <div className="flex flex-col">
            <label htmlFor="service_desc" className="font-medium">
              Select for {serviceNameFinal} type
            </label>
            <fieldset className='mt-1'>
              <div>
                <div>
                  <input
                    type='checkbox'
                    name='Drip'
                    id='Drip'
                    value="Drip"
                    checked={formData.service_desc.some((desc) => desc.service === 'Drip')}
                    onChange={handleCategoryChange}
                  />
                  <lable htmlFor="Drip" className="ml-2">Drip</lable>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Sprinkler'
                    id="Sprinkler"
                    value="Sprinkler"
                    checked={formData.service_desc.some((desc) => desc.service === 'Sprinkler')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Sprinkler' className='ml-2'>Sprinkler</label>
                </div>


                <div>
                  <input
                    type='checkbox'
                    name='other'
                    value="other"
                    checked={formData.service_desc.some((desc) => desc.service.startsWith('other: '))}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='other' className='ml-2'>Other</label>
                </div>
              </div>

              {formData.service_desc.some((desc) => desc.service === 'other') && otherIsOpen && (
                <div className='mt-2 mb-2'>
                  <textarea
                    id='other'
                    name='other'
                    className='shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:
                  dark:text-gray-300 p-2'
                    value={otherCategory}
                    onChange={handleOtherCategoryChange}
                    placeholder='Specify other crop type'
                  />
                </div>
              )}
            </fieldset>
          </div>
        )}

        {serviceNameFinal === 'Allied Activities' && (
          <div className="flex flex-col">
            <label htmlFor="service_desc" className="font-medium">
              Select for {serviceNameFinal} Size
            </label>
            <fieldset className='mt-1'>
              <div>

                <div>
                  <input
                    type='checkbox'
                    name='Dairy'
                    id='Dairy'
                    value="Dairy"
                    checked={formData.service_desc.some((desc) => desc.service === 'Dairy')}
                    onChange={handleCategoryChange}
                  />
                  <lable htmlFor="Dairy" className="ml-2">Dairy</lable>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Goat'
                    value="Goat"
                    checked={formData.service_desc.some((desc) => desc.service === 'Goat')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Goat' className='ml-2'>Goat</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Poultry'
                    id="Poultry"
                    value="Poultry"
                    checked={formData.service_desc.some((desc) => desc.service === 'Poultry')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Poultry' className='ml-2'>Poultry</label>
                </div>

                <div>
                  <input
                    type='checkbox'
                    name='Apiculture'
                    id="Apiculture"
                    value="Apiculture"
                    checked={formData.service_desc.some((desc) => desc.service === 'Apiculture')}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor='Apiculture' className='ml-2'>Apiculture</label>
                </div>

              </div>

            </fieldset>
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="images" className="font-medium mb-2">
            Service Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {imagesPreview && imagesPreview.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt="Service Preview" className="w-full h-40 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none"
                >
                  <DeleteRoundedIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-md focus:outline-none ${loading &&
            'cursor-not-allowed opacity-50'}`}
        >
          {loading ? 'Submitting...' : 'Add Service'}
        </button>

      </form>
    </div>
  );
};

export default OnFarmServiceForm;
