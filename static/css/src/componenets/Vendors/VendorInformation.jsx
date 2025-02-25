import React from 'react'
import { useAuth } from '../../User/AuthProvider'
import VendorInformationTable from './VendorInformationTable'
function VendorInformation() { 
    const {auth} = useAuth()
    const { username, phone, role, vendor_profile_exist, created_at } = auth.userData;
  return (
    <div>
        <VendorInformationTable username={username} phone={phone} role={role} vendor_profile_exist={vendor_profile_exist} created_at={created_at}/>
    </div>
  )
}

export default VendorInformation
