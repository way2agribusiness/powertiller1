import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
const ShowInputProduct = ({ vendorId }) => {
  const [products, setProducts] = useState([])
  const [actionVisible, setActionVisible] = useState(Array(products.length).fill(false));

  const handleActionProduct = (index) => {
    const updatedActionVisible = Array(products.length).fill(false);
    updatedActionVisible[index] = !actionVisible[index]
    setActionVisible(updatedActionVisible)
  }

  // const handleActive = async (id) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Do you want to change the Product status ?",
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: "Yes",
  //       denyButtonText: "No",
  //     });
  //     if (result.isConfirmed) {
  //       const response = await axios.patch(`http://localhost:5000/api/v1/input-product/status/${id}`);
  //       Swal.fire("Success!", response.data.message, "success");
  //       const updatedProductData = products.map(item => {
  //         if (item._id === id) {
  //           return { ...item, status: !item.status };
  //         }
  //         return item;
  //       });
  //       setProducts(updatedProductData)
  //     }
  //     else if (result.isDenied) {
  //       Swal.fire("Changes are not saved", "", "info");
  //     }

  //   }
  //   catch (error) {
  //     console.log("Error while Updating", error)
  //     console.error("Error while updating status:", error);
  //     Swal.fire("Error!", "Failed to update status.", "error");
  //   }
  // }

  const handleActive = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to change the product status?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/input-product/status/${id}`);
        Swal.fire("Success!", response.data.message, "success");
        const updatedFormData = products.map(item => {
          if (item._id === id) {
            return { ...item, visible: !item.visible }; 
          }
          return item;
        });
        setProducts(updatedFormData)
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.error("Error while updating status:", error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  const handleDeleteProduct = async (id) => {
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
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteinputproduct/${id}`);
        console.log("Delete response:", response.data);

        const updatedReqForm = products.filter(item => item._id !== id)
        setProducts(updatedReqForm)

        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success"
        });

      }
      catch (error) {
        console.error("Error deleting resource:", error);


        Swal.fire({
          title: "Error!",
          text: "Failed to delete the Product.",
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
  }

  const getInputProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/input/${vendorId}/products`)
    setProducts(response.data)
  }
  useEffect(() => {
    getInputProducts()
  }, [])
  return (
    <div>
      <div>
        <h1>Product Management:</h1>


        <table className='table-auto w-full'>
          <thead>
            <tr className='bg-gray-200 text-sm'>
              <th className='px-6 py-2'>Name</th>
              <th className='px-6 py-2'>Category</th>
              <th className='px-6 py-2'>Sub-category</th>
              <th className='px-6 py-2'>Stock</th>
              <th className='px-6 py-2'>Price</th>
              <th className='px-6 py-2'>Status</th>
              <th className='px-6 py-2'> Change Status</th>
              <th className='px-6 py-2'>Approval</th>
              <th className='px-6 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product, index) => (
              <tr key={product.id} className='hover:bg-gray-100 cursor-pointer text-sm'>
                <td className='border px-6 py-2'>{product.product_name}</td>
                <td className='border px-6 py-2'>{product.product_category}</td>
                <td className='border px-6 py-2'>{product.product_subcategory}</td>
                <td className='border px-6 py-2'>{product.stock}</td>
                <td className='border px-6 py-2'>
                  {product.price} <p className='text-gray-500 line-through'>{product.cuttedPrice}</p>
                </td>
                <td className='border px-6 py-2'>
                  {product.visible ? <div className='text-green-500 font-medium'>Listed</div> : <div className='text-red-600'>Not Listed</div>}
                </td>
                <td className="border px-6 py-2">
                  <button
                    onClick={() => handleActive(product._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Revert
                  </button>
                </td>

                <td className='border px-6 py-2'>
                  {product.approvedByAdmin ? <div className='text-green-600 font-bold'>Approved</div> : <div className='text-red-600'>Not Approved</div>}
                </td>
                <td className='border px-6 py-2' onClick={() => handleActionProduct(index)}>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
              </svg> */}
                  <button
                    // to={`/seller-dashboard/delete-product/${product.id}/${product.vendorId}`}
                    onClick={() => handleDeleteProduct(product._id)}
                    className='block px-2 py-2 bg-red-500 rounded-lg hover:bg-red-700'
                  >
                    Delete
                  </button>

                  {/* {actionVisible[index] && (
                  <div className='absolute bg-gray-200 shadow-lg rounded-lg mt-1 right-0 sm:right-auto z-10'>
                    <ul className='flex flex-col'>
                     
                      <li className='px-2 m-2'>
                        <button
                       
                          onClick={handleDeleteProduct(product._id)}
                          className='block px-2 py-2 bg-red-500 rounded-lg hover:bg-red-700'
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default ShowInputProduct