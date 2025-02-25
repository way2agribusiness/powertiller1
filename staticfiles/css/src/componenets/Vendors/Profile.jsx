import React from 'react'
import AddVendorForm from './AddVendorForm'
import { useAuth } from '../../User/AuthProvider'
import VendorInformation from './VendorInformation'
import VendorsDetailsTable from './VendorsDetailsTable'
const Profile = () => {
  const {auth} = useAuth();
  return (
    <div>

    {auth.role === 'vendor' ? ( 
      auth.userData?.vendor_profile_exist ? (
        <>
        <VendorInformation />
        <VendorsDetailsTable/>
        </>
      ) : (
        <>
        <VendorInformation /> 
        <AddVendorForm />
        </>

        // <h2>Vendor Form working in progress...</h2>
      )
    ) : (
      <p>Unauthorized. You do not have permission to view this page.</p> 
    )}
  </div>
  )
}

export default Profile