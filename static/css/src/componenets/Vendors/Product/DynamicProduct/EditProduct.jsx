import React from 'react'
import { useLocation, useParams } from 'react-router-dom'


const EditProduct = () => {
    const location = useLocation();
    const { vendorId, productId } = location.state;

  return (
    <div>
        <p>Vendor Id: {vendorId}</p>
        <p>Product Id: {productId}</p>
        <p>Edit Page content: </p>
    </div>
  )
}

export default EditProduct