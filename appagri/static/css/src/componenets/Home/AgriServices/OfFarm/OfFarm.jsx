import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css';
import ServiceCard from './ServiceCard';

const OfFarm = () => {
  const [openColumn, setOpenColumn] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('')
  const [category, setCategory] = useState('Detail Project Report');
  const [offServices, setOffServices] = useState([]);

  const [vendorInfo, setVendorInfo] = useState([])

  const toggleRows = (columnIndex, categoory) => {
    setCategory(categoory);
    setOpenColumn(openColumn === columnIndex ? null : columnIndex)
  }
  // console.log("Selected Category is ", category)

  const FetchOffService = async (category) => {
    const res = await axios.get(`http://localhost:5000/api/v1/off-farm/service/${category}`)
    setOffServices(res.data)
    // console.log("off Farm Serice is set to this userSrate", res.data);
  }

  
//   const fetchVendorInfo = async (vendorId) => {
//     try {
//         const response = await fetch(`http://localhost:5000/api/v1/getbyvendorid/${vendorId}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch vendor information');
//         }
//         const data = await response.json();
//         setVendorInfo(data);
//         console.log("Vendor data: ", data);
//     } catch (error) {
//         console.error('Error fetching vendor data:', error);
//     }
// };

  useEffect(() => {
    FetchOffService(category)
  }, [category])

  return (
    <div>
      <section style={{
        height: "20vh",
        width: "100%",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1718097598/esumkujezynbzazxhnqo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div>
          <p style={{ textAlign: "center" }} className='bg-green-700 text-white py-1 px-1 text-lg border rounded-md '>Off-Farm Services</p>
        </div>
      </section>
      <div className='flex flex-col lg:flex-row gap-5'>
        <div className='lg:ml-12 lg:w-1/4 lg:mt-5  w-full'>
          <div className='flex flex-row pt-4 mx-auto  max-w-screen-lg text-sm'>
            <section className='w-full lg:w-full'>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 1 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(1, 'Detail Project Report')}>
                    <div>Detail project Report</div>
                  </div>
                </div>
              </div>
              {/* Other service items */}
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 2 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(2, 'Crop Selection')}>
                    <div>Crop Selection</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 3 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(3, 'Technology Identificaion')}>
                    <div>Technology identification</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 4 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(4, 'Bank Funding')}>
                    <div>Bank Funding</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 5 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(5, 'Govt. Subsidies')}>
                    <div>Government Subsidy</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 6 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(6, 'Primary Processing')}>
                    <div>Primary Processing</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 7 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(7, 'Marketing Support')}>
                    <div>Marketing Support</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 gap-y-2'>
                  <div className={`flex justify-between items-center bg-gray-100 py-2 px-4 border rounded-md mb-1  hover:bg-green-600 hover:text-white cursor-pointer} ${openColumn === 8 ? 'bg-green-600 text-white' : 'hover:bg-green-600 hover:text-white'}`} onClick={() => toggleRows(8, 'Labour Supply')}>
                    <div>Labour Supply</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className='w-full lg:w-3/4 lg:mt-5 h-100%'>
          <h2 className="text-lg lg:text-xl font-semibold mb-4">{category}</h2>
          {category === 'Detail Project Report' && <h2 className="text-md lg:text-md font-medium mb-4">This agricultural project aims to boost crop yields and improve farmer livelihoods through modern techniques, training, and efficient irrigation. It seeks funding to ensure sustainable farming and increased productivity</h2>}
          {category === 'Crop Selection' && <h2 className="text-md lg:text-md font-medium mb-4">Crop selection involves choosing crops based on climate, soil, water, and market demand to maximize yield and profitability. Effective selection ensures sustainable farming and optimal resource use.</h2>}
          {category === 'Technology Identificaion' && <h2 className="text-md lg:text-md font-medium mb-4">Technology identification in agriculture involves selecting and implementing innovations like precision farming and AI-driven farm management systems to enhance productivity and sustainability</h2>}
          {category === 'Bank Funding' && <h2 className="text-md lg:text-md font-medium mb-4">It involves loans and credit lines provided by banks to support farmers and agricultural enterprises, enabling investments in equipment, land, and infrastructure to enhance productivity.</h2>}
          {category === 'Govt. Subsidies' && <h2 className="text-md lg:text-md font-medium mb-4"> Government subsidies in agriculture provide financial assistance to farmers and agricultural businesses through direct payments, price supports, and subsidies for inputs like seeds and fertilizers, aiming to ensure food security and promote sustainable farming practices.</h2>}
          {category === 'Primary Processing' && <h2 className="text-md lg:text-md font-medium mb-4"> Primary processing in agriculture involves the initial processing of raw agricultural products, such as cleaning, sorting, and packaging, to make them suitable for distribution and further processing. It prepares products like fruits, vegetables, and grains for market consumption or industrial use.</h2>}
          {category === 'Marketing Support' && <h2 className="text-md lg:text-md font-medium mb-4">Marketing support in agriculture includes activities such as market information dissemination and facilitation of market access, aimed at improving product competitiveness and ensuring better prices for farmers' produce.</h2>}
          {category === 'Labour Supply' && <h2 className="text-md lg:text-md font-medium mb-4"> Labour supply in agriculture refers to the availability and allocation of workers for farming activities, including planting, harvesting, and tending to crops and livestock, crucial for agricultural operations' success</h2>}
          {/* <h2 className="text-lg lg:text-xl font-semibold mb-4">This section creates the Cards and adds the data to show all the vendors who are providing this service:</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {offServices && console.log("All the off farm with categor is coming", offServices)}
            {/* {offServices.length > 0 ? <> {offServices && offServices.map((service) => (
              <div>
                <ServiceCard service={service} />
              </div>
            ))} </> : <>
              <p>Product Not Found for this Category:</p>
            </>} */}

            {offServices.length > 0 ? (
              <>
                {offServices && offServices.map((service) => (
                  <div key={service.id}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <p>Product Not Found for this Category</p>
              </>
            )}



          </div>
        </div>
      </div>


    </div>
  )
}

export default OfFarm