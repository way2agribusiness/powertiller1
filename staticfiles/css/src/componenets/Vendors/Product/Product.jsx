import React from 'react';
import { useAuth } from '../../../User/AuthProvider';
import ShowProduct from './ShowProduct';


const Product = () => {
  const { auth } = useAuth();

  const currentUserData = auth.userData;
  const vendorExist = currentUserData.vendor_profile_exist

  return (
    <div>
      {vendorExist ?  <ShowProduct/>: <h2>Vendor Profile is not Created !</h2>}
    </div>
  );
};

export default Product;
