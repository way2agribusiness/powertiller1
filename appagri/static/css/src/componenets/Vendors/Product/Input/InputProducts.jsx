import React from 'react'
import { Link } from 'react-router-dom'
import ShowInputProduct from './ShowInputProduct'
const InputProducts = ({ vendorStatus, vendorType, productExist, vendorID }) => {
  return (
    <div>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">

              {vendorStatus ? (
                <span className="text-green-600 font-semibold"> Seller Approved</span>
              ) : (
                <p className="text-red-600 font-semibold"> Seller Not Approved</p>
              )}
            </span>
            {!vendorStatus && (
              <div>
                <span className="text-base text-gray-700">
                  Contact Admin:
                  <Link to="/help" className="text-indigo-600 hover:text-indigo-500 ml-1">
                    help
                  </Link>
                </span>
              </div>
            )}
          </div>

        </div>

        <div className="flex flex-col items-center">
          {vendorStatus?   <img src="https://res.cloudinary.com/dq7vggsop/image/upload/v1718887659/g2befb2ncuhrv2n2996i.jpg" alt="Seller Approved" style={{ height: "9rem", width: "9rem" }} /> :   <img src="https://res.cloudinary.com/dq7vggsop/image/upload/v1718883965/gyqiymjmcdugchmhwcn0.jpg" alt="Seller Not Approved" style={{ height: "20rem", width: "20rem" }} />}
          
        
          {productExist ? (
            <div className="mt-4">
              <ShowInputProduct vendorId={vendorID} />
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No product found in your catalog</p>
          )}
        </div>
      </div>


    </div>
  )
}

export default InputProducts