import React from 'react'
import { Link } from 'react-router-dom'
const AgriServices = () => {
  return (
    <div>
        <h1 className='text-sm'>Agri Services</h1>
       <Link to="/agri-service/on-farm" className='text-sm'>On-Farm Agri Service</Link>
       <Link to="/agri-service/off-farm" className='text-sm'>Off-Farm Agri Service</Link>
    </div>
  )
}

export default AgriServices