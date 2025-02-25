import React from 'react'
import { Link } from 'react-router-dom'
const AgriService = () => {
  return (
    <div className='container mx-auto h-60vh grid grid-cols-1 lg:grid-cols-3 gap-4 shadow-lg'>
    <div className='grid-item  text-center'>
        <section
            style={{
                height: "80vh",
                width: "100%",
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1718256491/ynetwgaw3h5begjbpan0.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div className="text-bottom max-w-screen-lg px-2 md:px-4 lg:px-10 pt-20">
                <p className='text-white pb-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, neque distinctio similique quos molestiae, fuga ab excepturi dolor eius necessitatibus accusantium sunt. Similique, dolorum error fuga doloremque ut nihil libero?</p>
                <Link to="/agri-service/on-farm">
                    <button className="py-2 px-4 md:px-2  bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md">
                    Explore Agri Services
                    </button>
                </Link>
            </div>
        </section>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-green-600 font-medium text-xl mb-2'>On-Farm Service</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718271863/lbobpajeb5czigafiif7.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Cultivation type</h2>
            <h2>Crop type</h2>
            <h2>Farm Size</h2>
            <h2>Service Type</h2>
            <h2>Irrigation</h2>
            <h2>Allied Activities</h2>
            </div>
        </div>
       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro consectetur veniam officiis tempore perspiciatis ducimus adipisci explicabo laboriosam iure illum impedit quo, illo totam quaerat, inventore fugiat, aspernatur culpa earum animi. Nemo earum error distinctio, laboriosam vero, harum repudiandae accusantium provident, quia sequi sapiente ad nobis aut iure dignissimos ipsam?</p>
         
        <Link to="/agri-service/on-farm">
        <button  className="py-2 px-4 md:px-2 mt-5 mb-5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link> 
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-green-600 font-medium text-xl mb-2'>Off-Farm Service</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718271910/gda4eej87svupd8zlfy5.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm '>
            <h2>Detail project Report</h2>
            <h2>Crop Selection</h2>
            <h2>Technology Identification</h2>
            <h2>Bank funding</h2>
            <h2>Government Subcidies</h2>
            <h2>Primary processing</h2>
            <h2>Marketing Support</h2>
            <h2>Labour Supply</h2>
            </div>
        </div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad eos similique tenetur enim quia eaque illo. Inventore exercitationem sit quidem omnis. Corrupti eligendi natus velit architecto modi, dicta itaque, quasi voluptatum quibusdam quisquam repudiandae quia, praesentium quod repellendus est aspernatur sunt nemo autem? Sunt vitae hic praesentium, veniam blanditiis exercitationem.</p>
        <Link to="/agri-service/off-farm">
        <button  className="py-2 px-4 md:px-2 mt-5 mb-5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
    </div>
</div>
  )
}

export default AgriService