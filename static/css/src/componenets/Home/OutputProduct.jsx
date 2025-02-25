import React from 'react'
import { Link } from 'react-router-dom'

const OutputProduct = () => {
    return (
        <div className='container mx-auto h-60vh grid grid-cols-1 lg:grid-cols-4 gap-4 shadow-lg'>
            <div className='grid-item'>
                <section
                    style={{
                        height: "80vh",
                        width: "100%",
                        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1718256408/drof3ebyayrspaq9hg37.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div className="text-bottom max-w-screen-lg px-2 md:px-4 lg:px-10 pt-20">
                        <p className='text-white pb-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, neque distinctio similique quos molestiae, fuga ab excepturi dolor eius necessitatibus accusantium sunt. Similique, dolorum error fuga doloremque ut nihil libero?</p>
                        <Link to="/output-products">
                            <button className="py-2 px-4 md:px-2  bg-yellow-600 hover:bg-yellow-700 text-white font-semibold  shadow-md">
                            Explore Agricultural Outputs
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
            <div className='grid-item shadow-xl p-2'>
                <h1 className='text-yellow-600 font-medium text-xl mb-2'>Fruits</h1>
                <div className='flex flex-col lg:flex-row'>
                    <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718259435/idolsdm6t05l3y8iijjr.jpg' className='object-cover w-40 h-40 rounded-full' />
                    <div className='lg:pl-5'>
                    <h2>Apple</h2>
                    <h2>Orange</h2>
                    <h2>Strawberry</h2>
                    <h2>Watermelon</h2>
                    <h2>Mango</h2>
                    <h2>Banana</h2>
                    </div>
                </div>
                <p className='text-justify mb-5 text-sm pt-3'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae vero, laborum ut, reiciendis necessitatibus provident ullam impedit saepe corrupti architecto quos est accusamus itaque, id quam voluptates harum molestias animi. Voluptatibus modi vitae dolorum? Temporibus, eos rerum molestias nobis sapiente natus consequuntur mollitia asperiores eius porro unde commodi consectetur aliquam.</p>
                <button  className="py-2 px-4 md:px-2  bg-yellow-600 hover:bg-yellow-700 text-white font-semibold  shadow-md rounded-lg">More Fruits</button>
            </div>
            <div className='grid-item shadow-xl p-2'>
            <h1 className='text-yellow-600 font-medium text-xl mb-2'>Groceries</h1>
            <div className='flex flex-col lg:flex-row'>
                    <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718259402/fa22rngl7crxymwv2wzt.jpg' className='object-cover w-40 h-40 rounded-full' />
                    <div className='lg:pl-5'>
                    <h2>Bread</h2>
                    <h2>Rice</h2>
                    <h2>Sugar</h2>
                    <h2>Cooking Oil</h2>
                    <h2>Milk</h2>
                    <h2>Eggs</h2>
                    </div>
                </div>
                <p className='text-justify mb-5 text-sm pt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae vero, laborum ut, reiciendis necessitatibus provident ullam impedit saepe corrupti architecto quos est accusamus itaque, id quam voluptates harum molestias animi. Voluptatibus modi vitae dolorum? Temporibus, eos rerum molestias nobis sapiente natus consequuntur mollitia asperiores eius porro unde commodi consectetur aliquam.</p>
                <button  className="py-2 px-4 md:px-2  bg-yellow-600 hover:bg-yellow-700 text-white font-semibold  shadow-md rounded-lg">More Groceries</button>
            </div>
            <div className='grid-item shadow-xl p-2'>
            <h1 className='text-yellow-600 font-medium text-xl mb-2'>Vegetables</h1>
            <div className='flex flex-col lg:flex-row'>
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1718259473/h01k3ysiyryqe91ljec9.jpg' className='object-cover w-40 h-40 rounded-full' />

                    <div className='lg:pl-5'>
                    <h2>Tomato</h2>
                    <h2>Cucumber</h2>
                    <h2>Broccoli</h2>
                    <h2>Potato</h2>
                    <h2>Onion</h2>
                    <h2>Carrot</h2>
                    </div>
                </div>
                <p className='text-justify mb-5 text-sm pt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae vero, laborum ut, reiciendis necessitatibus provident ullam impedit saepe corrupti architecto quos est accusamus itaque, id quam voluptates harum molestias animi. Voluptatibus modi vitae dolorum? Temporibus, eos rerum molestias nobis sapiente natus consequuntur mollitia asperiores eius porro unde commodi consectetur aliquam.</p>
                <button className="py-2 px-4 md:px-2  bg-yellow-600 hover:bg-yellow-700 text-white font-semibold  shadow-md rounded-lg">More Vegetables</button>
            </div>
        </div>
    )
}
export default OutputProduct