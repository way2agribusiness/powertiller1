import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ShowOutputProduct = ({ vendorId }) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getInputProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/farmer/${vendorId}/products`);
        setProducts(response.data);
        console.log("Check the product is coming or not: ", response.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getInputProducts();
  }, [vendorId]);

  const handleDelete = async(id, prod)=>{
    const deleteTheProduct = window.confirm(`Are you sure want to delete ${prod}`)
    if(!deleteTheProduct)
      {
        return
      }
    await axios.delete(`${process.env.REACT_APP_API_URL}/delete/farmer/${id}`)
    setProducts(products.filter(pro=>pro._id !== id))
    toast.success("Deleted Successfully")
    console.log("Product Delete successfully")
  }

  const EditProduct = async (id,prod)=>{
    navigate(`/seller-dashboard/${id}`, { state: { vendorId, productId: id } });
  }

  const formatDateRange = (startDate, endDate) => {
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
  
    });

    const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    return `${formattedStartDate} - ${formattedEndDate}`;
  };
  const calculateDaysLeft = (startDate, endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDifference = end.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  }

  const getTotaldaysLeft = (daysleft) => {
    return daysleft > 6 ? "text-green-800" : "text-red-500";
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg hover:shadow-2xl transition duration-300">
            <div className="mb-4">
              {product.productImage && product.productImage.map((image, ind) => (
                <div key={ind} className="mb-2 flex justify-center items-center">
                  <img src={image.url} alt="Product" className="w-40 h-40 object-cover rounded" />
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-xl text-gray-800 text-center">{product.product_name}</p>
              <p className="text-sm text-gray-600">Quantity: {product.Quantity}</p>
              <p className="text-sm text-gray-600">Product Category: {product.product_category}</p>
              <p className="text-sm text-gray-600">Product Sub-Category: {product.product_subcategory}</p>
              <p className="text-sm text-gray-600">Description: {product.description}</p>

              <p className="text-sm font-bold">Available: <span className={`${getTotaldaysLeft(calculateDaysLeft(product.dateRange.startDate, product.dateRange.endDate))}`}>{product.dateRange && (
                <span>{formatDateRange(product.dateRange.startDate, product.dateRange.endDate)}</span>
              )}</span></p>
              <p className={`text-sm font-medium ${getTotaldaysLeft(calculateDaysLeft(product.dateRange.startDate, product.dateRange.endDate))}`}> {product.dateRange && calculateDaysLeft(product.dateRange.startDate, product.dateRange.endDate)} days left</p>

            </div>
            <span onClick={()=> handleDelete(product._id, product.product_name)} className='text-red-800 bg-gray-300 shadow-lg curos'>delete</span>
            <p onClick={()=> EditProduct(product._id, product.product_name)} className='text-red-800 bg-gray-300 shadow-lg curos'>Edit</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowOutputProduct;
