import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Input } from "@mui/material"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vendorIdFinal = location.state?.vendorID;
  const superCategoryFinal = location.state?.superCategory;


  const [vendor_id, setVendor_Id] = useState(vendorIdFinal);
  const [productSuperType, setProductSuperType] = useState(superCategoryFinal)
  const [product_type, setProductType] = useState('')
  const [product_name, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'vendor_id':
        setVendor_Id(value);
        break;
      case 'productSuperType':
        setProductSuperType(value);
        break;
      case 'product_type':
        setProductType(value);
        break;
      case 'product_name':
        setProductName(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'stock':
        setStock(value);
        break;
      default:
        break;
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldImages) => [...oldImages, reader.result]);
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setImagesPreview((oldImages) => oldImages.filter((_, i) => i !== index));
    setImages((oldImages) => oldImages.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (!vendorIdFinal || !superCategoryFinal) {
      return (
        <div>
          <h1>Data Missing</h1>
          <p>
            This page requires valid vendor and super category information. Please ensure your
            profile is complete and try again.
          </p>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => navigate('/seller-dashboard/profile')}
          >
            Go to Profile
          </button>
        </div>
      );
    }
  })

  const farmerOptions = [
    <option vlaue=" " disabled> Select</option>,
    <option value="Fruits" key="Fruits">Fruits</option>,
    <option value="Vegetables" key="Vegetables">Vegetables</option>,
    <option value="Groceries" key="Groceries">Groceries</option>,
  ];

  const inputManufacturerOptions = [
    <option vlaue=" " disabled> Select</option>,
    <option value="Fertilizer" key="Fertilizer">Fertilizer</option>,
    <option value="Pesticides" key="Pesticides">Pesticides</option>,
    <option value="Farm machinery" key="Farm machinery">Farm machinery</option>,
    <option value="Implements" key="Implements">Implements</option>,
    <option value="Agritech-Solutions" key="Agritech-Solutions">Agritech-Solutions</option>,
    <option value="Seeds-and-plants" key="Seeds-and-plants">Seeds & Plants</option>,
    <option value="Irrigation" key="Irrigation">Irrigation</option>,
  ];

  const serviceProviderOptions = [
    <option vlaue=" " disabled> Select</option>,
    <option value="onfarm" key="onfarm">On-Farm</option>,
    <option value="offfarm" key="offfarm">Off-Farm</option>,
  ];

  const options = {
    'Output': farmerOptions,
    'Input': inputManufacturerOptions,
    'Agri-Services': serviceProviderOptions,
  };

  const currentOptions = options[superCategoryFinal] || [<option key="none" value="">No options available</option>];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('vendor_id', vendor_id);
    formData.append('product_super_type', productSuperType);
    formData.append('product_type', product_type);
    formData.append('product_name', product_name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);

    images.forEach((image) => {
      formData.append('images', image);
    });
    console.log("Form Data full", formData)
    console.log("Actual data is ", ...formData)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-product`, formData, {
        headers: { "Content-Type": "application/json" }, // Use multipart/form-data for file uploads
      });
      console.log("Product added successfully:", response.data);
      setSuccessMessage('Product added successfully!');

      setDescription('')
      setImages([])
      setPrice('')
      setProductName('')
      setProductType('')
      setStock('')
      setImagesPreview([])

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);


    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {

        alert(`Error adding product: ${error.response.data.message}`);
      } else {

        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <p>Vendor Type: <span className="text-lg text-blue-700">{superCategoryFinal}</span></p>
      <p>Vendor ID: <span className="text-lg text-orange-600">{vendorIdFinal}</span></p>
      <Link to='/seller-dashboard/products'> <button className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"'> All products</button>
      </Link>

      <div>
        <form onSubmit={handleSubmit}

          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add new product</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input
              type="text"
              name="product_name"
              // value={vendorProduct.product_name}
              value={product_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              // value={vendorProduct.price}
              value={price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              type="text"
              name="description"
              value={description}
              rows={4}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              // value={vendorProduct.stock}
              value={stock}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Product Type:</label>
            <select
              name="product_type"
              // value={vendorProduct.product_type}
              value={product_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            >
              {currentOptions}
            </select>
          </div>



          <div className="mb-4">
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{
                accept: 'image/*',
              }}
              name="images"
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">

              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{ backgroundColor: 'green' }}

                startIcon={<CloudUploadIcon />} // Add icon to the button
              >
                Choose Product Image
              </Button>
            </label>

            {imagesPreview && imagesPreview.map((imagePreview, index) => (
              <>

                <div key={index} style={{ display: 'flex', alignItems: 'center', 'marginBottom': '10px' }}>
                  <img
                    src={imagePreview}
                    alt={`Image ${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                  />
                  <Button
                    variant='contained'
                    color="error"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleDeleteImage(index)}
                    startIcon={<DeleteRoundedIcon />}
                  >
                    Remove
                  </Button>
                </div>
              </>
            ))}
          </div>

          
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Add
          </button>
        </form>
        {successMessage && <p>{successMessage}</p>}


      </div>
    </div>
  );
};

export default AddProduct;
