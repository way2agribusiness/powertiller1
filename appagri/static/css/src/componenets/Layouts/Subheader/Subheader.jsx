import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css';

const Subheader = () => {
    useEffect(()=> {
      function handleScroll(){
        setIsHoveringInput(false)
        setIsHoveringOutput(false)
        setIsHoveringAgriService(false)
      }
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    },[])

    const [isHoveringInput, setIsHoveringInput] = useState(false);
    const [isHoveringOutput, setIsHoveringOutput] = useState(false)
    const [isHoveringAgriService, setIsHoveringAgriService] = useState(false);

    const handleMouseEnterInput = () => {
        setIsHoveringInput(true);
        setIsHoveringOutput(false)
        setIsHoveringAgriService(false)
    };
    const handleMouseLeaveInput = () => {
        setIsHoveringInput(false);
    };
    const handleMouseEnterOutput = () => {
        setIsHoveringOutput(true)
        setIsHoveringInput(false)
        setIsHoveringAgriService(false)
    }
    const handleMouseLeaveOutput = () => {
        setIsHoveringOutput(false)
    }
    const handleMouseEnterAgriService = () => {
        setIsHoveringAgriService(true)
        setIsHoveringInput(false)
        setIsHoveringOutput(false)
    }
    const handleMouseLeaveAgriService = () => {
        setIsHoveringAgriService(false)
    }
    const handleHomeButtonClick = () => {
        setIsHoveringInput(false)
        setIsHoveringOutput(false)
        setIsHoveringAgriService(false)
    }
    useEffect(()=>{
     AOS.init({duration:500})
    },[])

    return (
        <>
            <header className="bg-gray-50 border border-spacing-0.5  h-12 w-100% px-4 ">
                <div className="container mx-auto flex items-center h-full">
                    <Link to="/" className='pr-6 text-sm hover:text-green-600 active:text-green-700 font-medium text-green-900 focus:text-green-700 focus:outline-none' onClick={handleHomeButtonClick}>Home</Link>
                    <div className='relative flex flex-row cursor-pointer pr-6 ' >
                        <Link to="/input-products" className='pr-1 text-sm hover:text-green-600 font-medium text-green-900 active:text-green-700 focus:text-green-700 focus:outline-none'>Agri Inputs</Link>
                        <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717740921/zj2occnkds9hwwipklce.png' className='pt-1' style={{ height: '1rem', width: '1.2rem' }} onMouseEnter={handleMouseEnterInput}/>
                        {isHoveringInput && (
                            <div className="absolute left-0 mt-8 w-56 bg-white rounded-md shadow-lg z-10 text-sm"  data-aos="fade-up" onMouseEnter={handleMouseEnterInput} onMouseLeave={handleMouseLeaveInput}>
                                <ul className='mt-3 mb-3'>
                                    <Link to="input-product/seeds-and-plants" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'> Seeds and Plants </li></Link>
                                    <Link to="input-product/irrigation" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'> Irrigation </li></Link>
                                    <Link to="input-product/fertilizer" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'> Fertilizer </li></Link>
                                    <Link to="input-product/pesticides" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'> Pesticides </li></Link>
                                    <Link to="input-product/farm-machinery" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'> Farm machinery </li></Link>
                                    <Link to="input-product/agritech-solutions" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'> Agritech Solution </li></Link>
                                    <Link to="input-product/implements" onClick={()=> setIsHoveringInput(false)}> <li className='pl-4  hover:text-green-800'> Implements </li></Link>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-row cursor-pointer pr-6'>
                        <Link to="/output-products" className='pr-1 text-sm hover:text-green-600 font-medium text-green-900 active:text-green-700 focus:text-green-700 focus:outline-none'>Agri Output</Link>
                        <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717740921/zj2occnkds9hwwipklce.png' className='pt-1' style={{ height: '1rem', width: '1.2rem' }}  onMouseEnter={handleMouseEnterOutput}/>
                        {isHoveringOutput && (
                            <div className="absolute left-25 mt-8 w-56 bg-white rounded-md shadow-lg z-10 text-sm"  data-aos="fade-up" onMouseEnter={handleMouseEnterOutput} onMouseLeave={handleMouseLeaveOutput}>
                                <ul className='mt-3 mb-3'>
                                    <Link to="/output-product/fruits" onClick={()=> setIsHoveringOutput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'>Fruits</li></Link>
                                    <Link to="/output-product/vegetables"  onClick={()=> setIsHoveringOutput(false)}> <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'>Vegetables</li></Link>
                                    <Link to="/output-product/groceries" onClick={()=> setIsHoveringOutput(false)}> <li className='pl-4 hover:text-green-800 hover:bg-gray-100'>Groceries</li></Link>
                                    {/* <Link to="/output-product/crops"  onClick={()=> setIsHoveringOutput(false)}> <li className='pl-4  hover:text-green-800 hover:bg-gray-100'>Crops</li></Link> */}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-row cursor-pointer pr-6' >
                        <Link to="/agri-services" className='pr-1 text-sm hover:text-green-600 text-green-900 font-medium active:text-green-700 focus:text-green-700 focus:outline-none'>Agri Services</Link>
                        <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717740921/zj2occnkds9hwwipklce.png' className='pt-1' style={{ height: '1rem', width: '1.2rem' }} onMouseEnter={handleMouseEnterAgriService} />
                        {isHoveringAgriService && (
                            <div className="absolute left-30 mt-8 w-56 bg-white rounded-md shadow-lg z-10 text-sm" data-aos="fade-up" onMouseEnter={handleMouseEnterAgriService} onMouseLeave={handleMouseLeaveAgriService}>
                                <ul className='mt-3 mb-3 '>
                                    <Link to="/agri-service/on-farm" onClick={()=> setIsHoveringAgriService(false)}>  <li className='pl-4 pb-2 hover:text-green-800 hover:bg-gray-100'>On-farm Services</li></Link>
                                    <Link  to="/agri-service/off-farm" onClick={()=> setIsHoveringAgriService(false)}>  <li className='pl-4  hover:text-green-800 hover:gray-100'>Off-farm Services</li></Link>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Subheader;
