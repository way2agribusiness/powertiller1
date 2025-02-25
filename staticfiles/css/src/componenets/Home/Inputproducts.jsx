import React from 'react'
import { Link } from 'react-router-dom'
const Inputproducts = () => {
  return (
    <div className='container mx-auto h-60vh grid grid-cols-1 lg:grid-cols-4 gap-4 shadow-lg'>
    <div className='grid-item'>
        <section
            style={{
                height: "80vh",
                width: "100%",
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1718256371/wuzdw5gl9ooooktbgbot.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div className="text-bottom max-w-screen-lg px-2 md:px-4 lg:px-10 pt-20">
                <p className='text-white pb-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, neque distinctio similique quos molestiae, fuga ab excepturi dolor eius necessitatibus accusantium sunt. Similique, dolorum error fuga doloremque ut nihil libero?</p>
                <Link to="/input-products">
                    <button className="py-2 px-4 md:px-2  bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md">
                    Explore Agricultural Inputs
                    </button>
                </Link>
            </div>
        </section>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-gray-600 font-medium text-xl mb-2'>Seeds and Plants</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718266657/u8cjh6mpxwyk4nwkqcav.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2>
            </div>
        </div>
        <Link to="/input-product/seeds-and-plants">
        <button  className="py-2 px-4 md:px-2 mb-5 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md rounded-md">More Seeds and Plants</button>
        </Link>
        
        <h1 className='text-gray-600 font-medium text-xl mb-2'>Irrigation</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718267653/sb6uf7sucqk99z4k9b7h.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2>
            </div>
        </div>
        <Link to="/input-product/irrigation">
        <button  className="py-2 px-4 md:px-2 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md rounded-md">More Irrigation</button>
        </Link>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-gray-600 font-medium text-xl mb-2'>Fertilizer</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718267680/t9xulcik3ueg2jtk3nae.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2>
            </div>
        </div>
        <Link to="/input-product/fertilizer">
        <button  className="py-2 px-4 md:px-2 mb-5 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md rounded-md">More Fertilizer</button>
        </Link>
        
        <h1 className='text-gray-600 font-medium text-xl mb-2'>Pesticides</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718267719/hfyytu1r4qf0gdq06r83.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2>
            </div>
        </div>
        <Link to="/input-product/pesticides">
        <button  className="py-2 px-4 md:px-2 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md rounded-md">More Pesticides</button>
        </Link>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-gray-600 font-medium text-xl mb-2'>Farm Machinery</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718267743/rt08uq245cljylb8bic7.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2>
            </div>
        </div>
        <Link to="/input-product/farm-machinery">
        <button  className="py-2 px-4 md:px-2 mb-5 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md rounded-md">More Farm Machinery</button>
        </Link>
        
        <h1 className='text-gray-600 font-medium text-xl mb-2'>Implements</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718267774/p6ltpyfsaa3dpn7mugfh.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2>
            </div>
        </div>
        <Link to="/input-product/implements">
        <button  className="py-2 px-4 md:px-2 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold  shadow-md rounded-md">More Implements</button>
        </Link>
    </div>
</div>
  )
}

export default Inputproducts