import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../../../User/AuthProvider'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
const Enquiry = () => {

  const [authUser, setAuthUser] = useState('')
  const [formData, setFormData] = useState([]);
  const auth = useAuth();
  const CurrentUserFullData = auth?.auth.userData._id
  const response = async() => {
    const fetch = await axios.get(`${process.env.REACT_APP_API_URL}/reqform/form/${CurrentUserFullData}`)
    setFormData(fetch.data)
  }
  useEffect(()=>{
    setAuthUser(CurrentUserFullData)
    response()
  },[CurrentUserFullData])

  const handleActive = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to change the requirement status?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/reqformupdate/${id}`);
        Swal.fire("Success!", response.data.message, "success");
        const updatedFormData = formData.map(item => {
          if (item._id === id) {
            return { ...item, status: !item.status }; 
          }
          return item;
        });
        setFormData(updatedFormData)
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.error("Error while updating status:", error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  const handleDelete = async (id) => {

    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/reqformdelete/${id}`);
        console.log("Delete response:", response.data);

        const updatedReqForm = formData.filter(item => item._id !== id)
        setFormData(updatedReqForm)
  
        Swal.fire({
          title: "Deleted!",
          text: "Requirement has been deleted.",
          icon: "success"
        });
  
      } catch (error) {
        console.error("Error deleting resource:", error);
  

        Swal.fire({
          title: "Error!",
          text: "Failed to delete the resource.",
          icon: "error"
        });
  
        if (error.response) {
          toast.error(`Failed to delete resource: ${error.response.data.message}`);
        } else if (error.request) {
          toast.error("Failed to delete resource: No response received from server");
        } else {
          toast.error("Failed to delete resource: Error setting up the request");
        }
      }
    }
  };

  return (
    <div>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 ">All Enquiries:</h2>
      <div className="overflow-x-auto text-sm" >
        {formData.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
             
                <th className="py-2 px-4">Product/Service</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date of Post</th>
                <th className='py-2 px-4'>Change Status</th>
                <th className='py-2 px-4'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index} className="border-b border-gray-200">
               
                  <td className="py-2 px-4">{data.productService}</td>
                  <td className="py-2 px-4">{data.superCategory}</td>
                  <td className="py-2 px-4">{data.description}</td>
                  <td className="py-2 px-4">{data.status ? <span className="text-green-700">Active</span> : <span className="text-red-500">Inactive</span>}</td>
                  <td className="py-2 px-4">{new Date(data.postDate).toLocaleString()}</td>
                  <td className='py-2 px-4 text-orange-600 cursor-pointer' onClick={()=>handleActive(data._id)}>Revert</td>
                  <td className='py-2 px-4 text-red-600 cursor-pointer' onClick={()=> handleDelete(data._id)}>Remove</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No enquiry forms found.</p>
        )}
      </div>
    </div>
     </div>
  )
}

export default Enquiry