import React, { useState } from 'react';

const ServiceCard = ({ service,vendorInfo }) => {
    // const [vendorInfo, setVendorInfo] = useState(null);
    const defaultImage = 'https://res.cloudinary.com/dq7vggsop/image/upload/v1718181962/ezzoqmo9pxoorwre5ia9.jpg';


    const handleButtonClick = () => {
        // Handle button click logic here
        console.log('Avail Service clicked');
    };
    console.log("VEndor info is coming", vendorInfo)

    return (
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-lg mx-auto">
            <div className="flex">
                {/* Left Side */}
                <div className="flex-1 mr-4">
                    {/* Top Section */}
                    <div className="mb-4">
                        <p className='text-green-700 font-semibold pb-4'>{service.vendor_name}</p>
                       
                        <ul className="list-disc">
                            {service.specification.map((specs, index) => (
                                <li className='list-disc text-sm' key={index}>{specs.desc}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Bottom Section */}
                    <div className="bg-gray-100 p-2 rounded-lg text-sm">
                        <p className='text-gray-700'>Supplier: <span className='text-green-900'></span></p>
                        {vendorInfo ? (
                            <>
                                {vendorInfo.address && vendorInfo.address.map((address, index) => (
                                    <div key={index}>
                                        <p className='text-gray-700'>State: <span className='text-green-900'>{address.state}</span></p>
                                        <p className='text-gray-700'>City: <span className='text-green-900'>{address.city}</span></p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>Loading vendor information...</p>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 flex items-center justify-center">
                    <img src={service.image || defaultImage} alt={service.service_name} className="max-w-full max-h-48 rounded-lg" />
                </div>
            </div>

            {/* Bottom Mid */}
            <div className="flex justify-center mt-4">
                <button className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-900" onClick={handleButtonClick}>Avail Service</button>
            </div>
        </div>
    );
};

export default ServiceCard;
