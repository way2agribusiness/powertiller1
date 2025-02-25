import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Input } from "@mui/material";
import axios from 'axios';
import toast from 'react-hot-toast';

const AddInputProduct = () => {
  const location = useLocation();
  const { state } = location;
  const { vendorID } = state || {};
  const navigate = useNavigate()

  const vendorIdFinal = state?.vendorID;
  const superCategoryFinal = state?.superCategory;

  const [vendor_id, setVendorId] = useState(vendorIdFinal);
  const [product_name, setProductName] = useState('');
  const [productSuperType, setProductSuperType] = useState(superCategoryFinal);
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [cuttedPrice, setCuttedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    title: '',
    desc: '',
  });
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'vendor_id':
        setVendorId(value);
        break;
      case 'productName':
        setProductName(value);
        break;
      case 'productCategory':
        setProductCategory(value);
        break;
      case 'productSubCategory':
        setProductSubCategory(value);
        break;
      case 'cuttedPrice':
        setCuttedPrice(value);
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
      case 'warranty':
        setWarranty(value);
        break;
      default:
        break;
    }
  };

  const handleAllProduct = () => {
    navigate('/seller-dashboard/products');
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {

          const base64Image = reader.result; // Base64 encoded image data

          // Calculate approximate image size (consider base64 encoding overhead)
          const approximateSize = base64Image.length * (3 / 4); // Assuming UTF-8 encoding

          console.log(`Image size (approximate, base64 encoded): ${approximateSize} bytes`);
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleDeleteImage = (index) => {
    setImagesPreview((oldImages) => oldImages.filter((_, i) => i !== index));
    setImages((oldImages) => oldImages.filter((_, i) => i !== index));
  };

  const handleSpecsChange = (e) => {
    setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!specsInput.title.trim() || !specsInput.desc.trim()) return;
    setSpecs([...specs, specsInput]);
    setSpecsInput({ title: '', desc: '' });
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setLoading(true)
    const formData = new FormData();
    formData.append('vendor_id', vendor_id);
    formData.append('product_super_type', productSuperType);
    formData.append('productName', product_name);
    formData.append('productCategory', productCategory);
    formData.append('productSubCategory', productSubCategory);
    formData.append('cuttedPrice', cuttedPrice);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('warranty', warranty);

    // Append specs
    specs.forEach((spec, index) => {
      formData.append(`specs[${index}][title]`, spec.title);
      formData.append(`specs[${index}][desc]`, spec.desc);
    });

    // Append images
    images.forEach((image) => {
      formData.append(`images`, image);
    });
    console.log("All deatils of product", ...formData)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/createinputproduct`,
        // 'http://localhost:5000/api/v1/createinputproduct',
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // For file uploads
          },
        }
      );
      // Handle successful response (e.g., reset form or display success message)
      console.log(response.data.message);
      toast.success("Product Added Successfully !")
      // console.log('Product created successfully:', response.data);
      setProductName('');
      setProductCategory('');
      setProductSubCategory('');
      setPrice('');
      setCuttedPrice('');
      setDescription('');
      setStock(0);
      setWarranty(0);

      setSpecs([]);
      setSpecsInput({
        title: '',
        desc: '',
      });
      setImages([]);
      setImagesPreview([]);
      // toast.success("Product Added Successfully !")
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle errors (e.g., display error message to user)
      setError('Failed to Add. Please try again later.');
      toast.error("Error creating product! Please try again.");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <p>SubCategory is: {state?.superCategory}</p>
      <p>Form will be here to add the product: {vendorID}</p>

      <button onClick={handleAllProduct} className='bg-green-400 text-white p-2 rounded'> All Products </button>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row w-full rounded-lg shadow-lg mb-6'>
          <div className='m-2 w-1/2'>
            <div className="mb-4 flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                placeholder="Enter the Product Name"
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
                onChange={handleChange}
                required
                value={product_name}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Describe</label>
              <textarea
                type="text"
                name="description"
                rows={4}
                placeholder="Describe your product"
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:border-green-500"
                value={description}
                required
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-row mb-4 gap-3'>
              <div className='w-1/2'>
                <label>Price</label>
                <input
                  type='number'
                  name="price"
                  placeholder='Enter Price'
                  onChange={handleChange}
                  required
                  className='px-4 py-2 border border-gray-300 rounded-md focus:border-green-500'
                />
              </div>
              <div className='w-1/2'>
                <label>Cutted Price</label>
                <input
                  type='number'
                  name="cuttedPrice"
                  placeholder='Enter Cutted Price'
                  onChange={handleChange}
                  required
                  className='px-4 py-2 border border-gray-300 rounded-md focus:border-green-500'
                />
              </div>
            </div>
            <div className='flex flex-row mb-4 gap-3' >
              <div className='w-1/2 gap-2'>
                <label>Stock</label>
                <input
                  type='number'
                  name="stock"
                  value={stock}
                  onChange={handleChange}
                  required
                  className='px-4 py-2 border border-gray-300 rounded-md focus:border-green-500'
                />
              </div>
              <div className='w-1/2'>
                <label>Warranty</label>
                <input
                  type='number'
                  name="warranty"
                  onChange={handleChange}
                  value={warranty}
                  required
                  className='px-4 py-2 border border-gray-300 rounded-md focus:border-green-500'
                />
              </div>
            </div>
            <div className='flex flex-row mb-4 gap-3'>
              <div className='w-1/2'>
                <label>Category</label>
                <select
                  name='productCategory'
                  value={productCategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                >
                  <option value="" disabled>Select</option>
                  <option value="Seeds-and-Plants">Seeds & Plants</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Pesticides">Pesticides</option>
                  <option value="Farm Machinery">Farm Machinery</option>
                  <option value="Agritech Solutions">Agritech Solutions</option>
                  <option value="Implements">Implements</option>
                </select>
              </div>
              <div className='w-1/2'>
                <label>Sub-Category</label>
                <input
                  name="productSubCategory"
                  type='text'
                  value={productSubCategory}
                  placeholder='Ex. Brush Cutter, Power Weeder'
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className='m-2 w-1/2'>
            <div className='flex flex-row mb-4'>
              <div>
                <label className="text-gray-700 font-medium mb-1">Specification</label>
                <div className='flex flex-row gap-2 mb-4' >
                  <input
                    value={specsInput.title}
                    onChange={handleSpecsChange}
                    name="title"
                    placeholder="title"
                    className='px-2 py-2 border border-gray-300 rounded-md focus:border-green-500'
                  />
                  <input
                    value={specsInput.desc}
                    onChange={handleSpecsChange}
                    name="desc"
                    placeholder="description"
                    className='px-2 py-2 border border-gray-300 rounded-md focus:border-green-500'
                  />
                  <span
                    onClick={() => addSpecs()}
                    className="py-2 px-2 bg-green-400 text-white rounded hover:shadow-lg cursor-pointer"
                  >
                    Add
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 w-90">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                      <p className="text-gray-500 font-medium">{spec.title}</p>
                      <p>{spec.desc}</p>
                      <span
                        onClick={() => deleteSpec(i)}
                        className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>




              <p>Product Image</p>
              <div className='mb-4 mt-4'>
                <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Choose product
                </label>

                {imagesPreview && imagesPreview.map((image, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img
                      src={image}
                      alt={`product ${index}`}
                      style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                    />
                    <button
                      style={{
                        marginLeft: '10px',
                        backgroundColor: '#d32f2f', // Material-UI 'error' color
                        color: 'white',
                        padding: '6px 16px',
                        fontSize: '0.875rem',
                        minWidth: '64px',
                        boxSizing: 'border-box',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.02857em',
                        fontWeight: '500',
                        lineHeight: '1.75'
                      }}
                      onClick={() => handleDeleteImage(index)}
                    >
                      <DeleteRoundedIcon style={{ marginRight: '8px' }} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>
        <button type='submit'
          className="bg-green-700 text-white px-4 py-2 focus:outline-none hover:bg-gray-100 hover:border border-green-900 hover:text-green-700"
          disabled={loading}
        >
          {loading ? 'Adding....' : 'Add Product'}
        </button>
        {/* <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">Add New Product</button> */}
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}
      </form>
    </div>
  );
};

export default AddInputProduct;