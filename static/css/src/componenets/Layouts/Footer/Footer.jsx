import React from 'react'

function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex md:flex-row flex-col pr-4 md:pr-12">
          {/* <img src="your-logo" alt="KAB Logo" className="h-16 w-16 mr-3 md:mr-0" /> */}
          <p className="text-base font-medium">
            KAB-Farmer's B2B Trading platform.
          </p>
        </div>
        {/* <ul className="flex flex-wrap md:ml-auto md:mr-0 ml-auto -mr-4 md:pl-4">
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Fertilizer
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Help
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Become a seller?
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Pesticides
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Farm machinery
            </a>
          </li>
        </ul> */}
        {/* <ul className="flex flex-wrap md:ml-auto md:mr-0 ml-auto -mr-4 md:pl-4">
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Customer Care
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Complaints
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline py-2 px-4">
              Terms & Condition-Read Carefully
            </a>
          </li>
        </ul> */}
      </div>
      <div className="flex justify-center mt-4 md:mt-0">
        <p className="text-center text-sm text-gray-500">
          © 2024 KAB by Way2agribusiness India Pvt Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
