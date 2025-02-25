import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const ShowServices = ({ vendorId }) => {
  const navigate = useNavigate();
  const [onFarmProducts, setOnFarmProducts] = useState([])
  const [ofFarmProducts, setOfFarmProducts] = useState([]);

  const handleClick = async(id) => {
    if(!window.confirm("Are you sure want to delete")) {
      console.log("Don't delete")
      return
    }
   try{
    await axios.delete(`${process.env.REACT_APP_API_URL}/ofFarm/service/${id}`)
    toast.success("Deleted Successfully")
    console.log("Service deleted Successfully")

   }
   catch(error)
   {

   }
  }

  const handleClickOff = async(id) => {
    if(!window.confirm("Are you sure want to delete")) {
      console.log("Don't delete")
      return
    }
    try{
      await axios.delete(`${process.env.REACT_APP_API_URL}/ofFarm/service/${id}`)
      toast.success("Deleted Succussfully")
      // console.log("Service deleted successfully:", response.data);

    }
    catch(error)
    {
      toast.error(error)
      console.log("Error while deleting", error)
    }
    console.log("Off Farnm Selected")
  }

  const onAgriService = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/onfarm/${vendorId}`)
      setOnFarmProducts(response.data.product);
    }
    catch (error) {
      console.log("Error fetching products", error)
    }
  }
  const ofAgriService = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/offarm/${vendorId}`);
      setOfFarmProducts(response.data.product);
    }
    catch (error) {
      console.log("Error fetching products", error);
    }
  }

  useEffect(() => {
    onAgriService();
    ofAgriService()
  }, [vendorId])

  return (
    <div>
      <p>display all On-farm and Off-farm Services: List down all here:</p>
      <span>Vendor ID: {vendorId}</span>

      {onFarmProducts.length >= 1 && (
        <>
          <h2 className='text-lg text-gray-800 font-medium pt-3 pb-5 '>All On-Farm Services:</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Service Name</th>
                <th scope="col" className="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Service Category</th>
                <th scope="col" className="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Service Location</th>
                <th scope="col" className="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Service Images</th>
                <th scope="col" className="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {onFarmProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-200 text-sm">
                  <td className="px-6 py-1 whitespace-nowrap text-sm">{product.service_name}</td>
                  <td className="px-6 py-1">
                    {product.service_desc.map((desc, index) => (
                      <p key={index} className="text-sm text-gray-900">{desc.desc}</p>
                    ))}
                  </td>
                  <td className="px-6 py-1 text-sm">
                    {product.service_location.map((location, index) => (
                      <p key={index} className="text-sm text-gray-900">{location.loc}</p>
                    ))}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap flex space-x-2">
                    {product.service_image.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={`Service Image ${index}`}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                    ))}
                  </td>
                  <td className='px-6 py-1'>
                    <span onClick={() => handleClick(product._id)} className='text-red-600 text-sm' >delete</span>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {ofFarmProducts.length >= 1 && (
        <>
          <h2 className='text-lg text-gray-800 font-medium pt-3 pb-5'>All Off-Farm Services:</h2>
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" class="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Service Name</th>
                <th scope="col" class="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Specification</th>
                <th scope="col" class="px-6 py-1 bg-gray-50 text-left text-xs font-sm text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              {ofFarmProducts && ofFarmProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-200">
                  <td className="px-6 py-1 whitespace-nowrap text-sm">{product.service_name}</td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm">
                    <ul>
                      {product.specification.map((specs, index) => (
                        <li key={index}>{specs.desc}</li>
                      ))}
                    </ul>
                  </td>
                  <td className='px-6 py-1 whitespace-nowrap text-sm text-red-600' onClick={() => handleClickOff(product._id)}>Delete</td>
                </tr>
              ))}

            </tbody>
          </table>
        </>

      )}

    </div>
  )
}

export default ShowServices