import React from 'react'
import { Link } from 'react-router-dom'
const AgriServiceOff = () => {
  return (
    <div className='container mx-auto h-60vh grid grid-cols-1 lg:grid-cols-4 gap-4 shadow-lg'>
    <div className='grid-item  text-center'>
        <section
            style={{
                height: "90vh",
                width: "100%",
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1718270884/lqvzq13w1ovb95sxyyj3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div className="text-bottom max-w-screen-lg px-2 md:px-4 lg:px-10 pt-20">
                <p className='text-white pb-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, neque distinctio similique quos molestiae, fuga ab excepturi dolor eius necessitatibus accusantium sunt. Similique, dolorum error fuga doloremque ut nihil libero?</p>
                <Link to="/agri-service/off-farm">
                    <button className="py-2 px-4 md:px-2  bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md">
                    Explore Off-farm Services
                    </button>
                </Link>
            </div>
        </section>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-green-600 font-medium text-xl mb-2'>Detail project Report</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718272231/ydohvgccghou6bavfsfx.jpg' className='object-cover w-20 h-20 rounded-full' />
            <div className='lg:pl-5 text-sm mb-3'>
            {/* <h2>Apple</h2>
            <h2>Orange</h2>
            <h2>Strawberry</h2>
            <h2>Watermelon</h2>
            <h2>Mango</h2>
            <h2>Banana</h2> */}
            </div>
        </div>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eius magnam rem ad nemo! Distinctio accusamus perspiciatis corporis laboriosam cum sapiente inventore. Asperiores est facere dolorum, totam natus excepturi impedit nemo incidunt? Vel deserunt cupiditate atque hic quis, illo laudantium.</p> */}
            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum veritatis fugit provident porro eligendi eius magnam possimus perspiciatis, aspernatur reiciendis!</p>
        <Link to="/input-product/seeds-and-plants">
        <button  className="py-2 px-4 md:px-2 mb-5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
        
        <h1 className='text-green-600 font-medium text-xl mb-2'>Crop Selection</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718267653/sb6uf7sucqk99z4k9b7h.jpg' className='object-cover w-20 h-20 rounded-full' />
          
        </div>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam autem eaque natus mollitia voluptates, nostrum nihil accusantium distinctio ullam ipsum explicabo ducimus iusto eveniet! Ullam perspiciatis architecto cumque libero natus!</p> */}
        <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat a possimus iste cumque sequi accusamus fuga, consequatur ratione voluptatibus expedita.</p>
        <Link to="/input-product/irrigation">
        <button  className="py-2 px-4 md:px-2 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-green-600 font-medium text-xl mb-2'>Technology Identification</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718272295/dhpbdb9ugyg97kxtitk2.jpg' className='object-cover w-20 h-20 rounded-full' />
          
        </div>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit unde cum voluptatum dignissimos aspernatur distinctio expedita quo? Dolor similique laborum necessitatibus voluptatem delectus possimus quos provident, animi fugit, earum facere.</p> */}
        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, debitis illum accusantium animi fuga itaque temporibus blanditiis! Quasi, ipsum harum.</p>
        <Link to="/input-product/fertilizer">
        <button  className="py-2 px-4 md:px-2 mb-5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
        
        <h1 className='text-green-600 font-medium text-xl mb-2'>Bank funding</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718272326/jt0pjunlheilhsgpwx2g.jpg' className='object-cover w-20 h-20 rounded-full' />
          
        </div>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aliquid dolores voluptatibus optio dolorum eius reiciendis facere pariatur odit totam reprehenderit neque, velit cupiditate itaque? Distinctio facere rem ad consequatur.</p> */}
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni itaque numquam, voluptatibus ipsam amet qui minima sint dolor voluptas autem!</p> */}
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, unde animi? Placeat eum nemo voluptatum vel minus architecto dolor quis?</p>
        <Link to="/input-product/pesticides">
        <button  className="py-2 px-4 md:px-2 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
    </div>
    <div className='grid-item shadow-xl p-2'>
        <h1 className='text-green-600 font-medium text-xl mb-2'>Government Subcidies</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718272373/hk8g0yzqlulhudtlt0ad.jpg' className='object-cover w-20 h-20 rounded-full' />
         
        </div>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores architecto, quibusdam deserunt necessitatibus incidunt laborum at! Eligendi pariatur ullam adipisci aut magnam, neque natus tenetur eveniet ipsam rerum consectetur doloribus.</p> */}
        <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam sapiente magnam dolorem dolorum rerum magni ipsa reiciendis quod id tempora.</p>
        <Link to="/input-product/farm-machinery">
        <button  className="py-2 px-4 md:px-2 mb-5 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
        
        <h1 className='text-green-600 font-medium text-xl mb-2'>Primary processing</h1>
        <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718272403/rwadva6vtxaprci8rmkw.jpg' className='object-cover w-20 h-20 rounded-full' />
          
        </div>
        {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat iste totam consequatur odio consequuntur impedit provident officiis fugit quos sint. Incidunt recusandae vero sint minus repellendus, ab officia vitae temporibus?</p> */}
        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed harum rerum esse exercitationem cupiditate? Magni totam nisi recusandae nostrum beatae?</p>
        <Link to="/input-product/implements">
        <button  className="py-2 px-4 md:px-2 text-sm bg-green-600 hover:bg-green-700 text-white font-semibold  shadow-md rounded-md">See More</button>
        </Link>
    </div>
</div>
  )
}

export default AgriServiceOff