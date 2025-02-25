import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Button, Input } from '@mui/material';
import axios from 'axios';

import toast from 'react-hot-toast';

const AddOutputProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { vendorID } = state || {};


  const [vendor_id, setVendor_Id] = useState(vendorID);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productSuperType, setProductSuperType] = useState('Output');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleAllProduct = () => {
    navigate('/seller-dashboard/products');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'vendor_id':
        setVendor_Id(value);
        break;
      case 'productName':
        setProductName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'subcategory':
        setSubcategory(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      default:
        break;
    }
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {

          const base64Image = reader.result; 

          const approximateSize = base64Image.length * (3 / 4); 

          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = ''
  };


  const handleDeleteImage = (index) => {
    setImagesPreview((oldImages) => oldImages.filter((_, i) => i !== index));
    setImages((oldImages) => oldImages.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!productName)
      {
        toast.error("Product name is missing")
        return
      }
    if(!quantity)
      {
        toast.error("Qunatity is missing")
        return
      }
    if(!category)
      {
        toast.error("Category is missing")
        return
      }
    // if(!subcategory)
    //   {
    //     toast.error("Subcategory is missing")
    //     return
    //   }
    // if(!description)
    // {
    //   toast.error("Desscription is missing")
    //   return
    // }
    if(!startDate)
      {
        toast.error("Choose the start date")
        return
      }
    if(!endDate)
      {
        toast.error("Choose the end date")
        return
      }
    if(!images)
      {
        toast.error("Please add images")
        return
      }
    const formData = new FormData();
    formData.append('vendor_id', vendor_id);
    formData.append('productName', productName)
    formData.append('quantity', quantity)
    formData.append('productSuperType',productSuperType);
    formData.append('category', category)
    formData.append('subcategory', subcategory)
    formData.append('description', description)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/outputproduct`,
        // 'http://localhost:5000/api/v1/outputproduct',
        formData,
        {
          headers: {"Content-Type": "application/json"},
        }
      );
      
    setProductName('')
    setCategory('')
    setSubcategory('')
    setDescription('')
    setQuantity('')
    setStartDate('')
    setEndDate('')
    setImages([])
    setImagesPreview([])
      toast.success("Product Added Successfully !");
  
    } catch (error) {
      console.error('Error creating output product:', error);
      toast.error("Error creating product! Please try again.");
    }
  };

  return (
    <div>
      <div>
        {/* <p>I will integrate the form for the farmer so that they can add the outputs: {vendorID}</p> */}
        <button onClick={handleAllProduct} className="bg-green-500 text-white p-2 rounded">
          All Products
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter the Product Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
              onChange={handleChange}
              value={productName}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter the Quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
              onChange={handleChange}
              value={quantity}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              onChange={handleChange}
              value={category}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
            >
              <option value="" disabled>Select</option>
              <option value="Fruits" key="Fruits">Fruits</option>
              <option value="Vegetables" key="Vegetables">Vegetables</option>
              <option value="Groceries" key="Groceries">Groceries</option>
              <option value="Crop" key="Crop">Crop</option>
              <option value="Others" key="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1">Sub-category</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Enter the Subcategory"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
              onChange={handleChange}
              value={subcategory}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Write about the Service in brief..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
              onChange={handleChange}
              value={description}
            />
          </div>

          <div className="mb-4 flex">
            <div className="w-1/2 pr-4">
              <label className="text-gray-700 font-medium mb-1">Available From</label>
              <input
                type="date"
                name="startDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
                onChange={handleChange}
                value={startDate}
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-700 font-medium mb-1">To</label>
              <input
                type="date"
                name="endDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
                onChange={handleChange}
                value={endDate}
              />
            </div>
          </div>

          {/* <div className="mb-4 mt-4">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              name="images"
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="bg-green-500 text-white p-2 rounded cursor-pointer">
              <CloudUploadIcon />
              Upload Service/Product Image
            </label>

            {imagesPreview && imagesPreview.map((imagePreview, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={imagePreview}
                  alt={`Image ${index}`}
                  style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                />
                <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDeleteImage(index)}>
                  <DeleteRoundedIcon />
                  Remove
                </button>
              </div>
            ))}
          </div> */}


          <div className="mb-4 mt-4">
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
                color="success"
                component="span"
                startIcon={<CloudUploadIcon />}
                className="bg-green-500 text-white"
              >
                Upload
              </Button>
            </label>

            {imagesPreview.map((image, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={image}
                  alt={`Avatar ${index}`}
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
          <button type="submit" className="bg-green-600 p-2 text-white rounded-md">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOutputProduct;