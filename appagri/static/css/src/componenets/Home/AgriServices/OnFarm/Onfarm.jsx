import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useAuth } from '../../../../User/AuthProvider';


const Onfarm = () => {
  
  const [onService, setOnService] = useState([]);
  const [openColumn, setOpenColumn] = useState(null);
  const [category, setCategory] = useState('')
  const [subCategory, setSubcategory] = useState('');

  const [productFoundStatus, setProductFoundStatus] = useState(true)


  const toggleRows = (columnIndex, category) => {
    setCategory(category)
    setSubcategory('');
    setOpenColumn(openColumn === columnIndex ? null : columnIndex);
  };
  const fetchOnService = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/onfarm/service/${category}/${subCategory}`);
      console.log(`Data is coming category ${category} is and subcategory is ${subCategory}`, res.data);
      if(res.data.status===200)
        {
          setOnService(res.data);
        }
    } catch (error) {
      if(error.response && error.response.status === 404)
        {
          setProductFoundStatus(true)
        }
      else {
        console.error('Error fetching data:', error);
      }
    }
  };
  useEffect(()=>{
    if(productFoundStatus)
      {
        fetchOnService();
      }
  },[])

  useEffect(() => {
    AOS.init();
  }, [category, subCategory]);
  
  const handleGetCategorySubcategory = (subcategory) => {
    setSubcategory(subcategory)
  }
  console.log("Selected Category is ", category)
  console.log("Selected Subcategory is ", subCategory)
  

  return (
    <div>
      <section style={{
        height: "20vh",
        width: "100%",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1718015256/qkgoxd91hmpx5xcpihnu.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div>
          <p style={{ textAlign: "center" }} className='bg-orange-800 text-white py-1 px-1 text-lg border rounded-md '>On-farm Services</p>
        </div>
      </section>
      <div className='flex flex-row items-center pt-4 px-4 justify-between'>
        <section>
          {/* Second section is title */}
          <h2 className='text-lg font-bold'>Category</h2>
        </section>
        <section className='text-sm mr-3'>
          {/* Third Section is On-farm cards service */}
          <span className='text-gray-500'>Sort by</span>
          <span>Default</span>
        </section>
      </div>


      <div className='flex flex-row pt-4 mx-auto max-w-screen-lg text-sm'>
        <section className='w-40'>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex  justify-between  items-center bg-gray-200 py-2 px-4 cursor-pointer" onClick={() => toggleRows(1,'Cultivation Type')}>
                <div>Cultivation Type</div>
                <div>{openColumn === 1 ? '▲' : '▼'}</div>
              </div>
              {openColumn === 1 && (
                <div className="py-2 px-4" data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                  <div className="py-1 cursor-pointer hover:text-green-800"  onClick={() => handleGetCategorySubcategory('Open cultivation')}>Open cultivation</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={() => handleGetCategorySubcategory('Greenhouse')}>Greenhouse</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=> handleGetCategorySubcategory('Other')}>Other</div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex justify-between items-center bg-gray-200 py-2 px-4 cursor-pointer" onClick={() => toggleRows(2,'Crop Type')}>
                <div>Crop Type</div>
                <div>{openColumn === 2 ? '▲' : '▼'}</div>
              </div >
              {openColumn === 2 && (
                <div className="py-2 px-4 " data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Vegetables')}>Vegetables</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Fruits')}>Fruits</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Flowers')}>Flowers</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Perennial crops')}>Perennial crops</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Other field crops')}>Other field crops</div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex justify-between items-center bg-gray-200 py-2 px-4 cursor-pointer" onClick={() => toggleRows(3,'Farm Size')}>
                <div>Farm Size</div>
                <div>{openColumn === 3 ? '▲' : '▼'}</div>
              </div>
              {openColumn === 3 && (
                <div className="py-2 px-4" data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Big')}>Big</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Medium')}>Medium</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Small')}>Small</div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex justify-between items-center bg-gray-200 py-2 px-4 cursor-pointer" onClick={() => toggleRows(4,'Service Type')}>
                <div>Service Type</div>
                <div>{openColumn === 4 ? '▲' : '▼'}</div>
              </div>
              {openColumn === 4 && (
                <div className="py-2 px-4" data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Farm Management')}>Farm Management</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Crop Selection')}>Crop Selection</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Nutrients & Plants')}>Nutrients & Plants</div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex justify-between items-center bg-gray-200 py-2 px-4 cursor-pointer" onClick={() => toggleRows(5,'Irrigation')}>
                <div>Irrigation</div>
                <div>{openColumn === 5 ? '▲' : '▼'}</div>
              </div>
              {openColumn === 5 && (
                <div className="py-2 px-4" data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Drip')}>Drip</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Sprinkler')}>Sprinkler</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Other')}>Other</div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex justify-between items-center bg-gray-200 py-2 px-4 cursor-pointer" onClick={() => toggleRows(6,'Allied activities')}>
                <div>Allied activities</div>
                <div>{openColumn === 6 ? '▲' : '▼'}</div>
              </div>
              {openColumn === 6 && (
                <div className="py-2 px-4" data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Diary')}>Dairy</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Goat')}>Goat</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Poultry')}>Poultry</div>
                  <div className="py-1 cursor-pointer hover:text-green-800" onClick={()=>handleGetCategorySubcategory('Apiculture')}>Apiculture</div>
                </div>
              )}
            </div>
           
          </div>
        </section>
        <section className='text-sm w-60 bg-green-200'>
          {/* Second Section is On-farm cards service */}
          <span className='text-gray-500'>Sort by</span> <span>Default</span>
          <section>
        {/* Display the services one by one with category */}
        {onService && onService.map((service, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-center items-center">
          {service.service_image.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Service Image ${index}`}
              className="w-16 h-16 object-cover rounded-lg shadow-sm"
            />
          ))}
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-sm text-gray-500">{service.service_location}</p>
          <h2 className="text-lg font-bold mb-2">{service.service_name}</h2>
          <p className="text-sm text-gray-600 mb-2">{service.type}</p>
          <ul className="list-disc list-inside">
            {service.service_desc.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-auto">{service.vendor_name}</p>
        </div>
      </div>
    ))}
      </section>
        </section>
      </div>
   
    </div>
  )
}

export default Onfarm