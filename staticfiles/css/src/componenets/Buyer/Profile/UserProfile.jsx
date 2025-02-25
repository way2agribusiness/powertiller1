import React from 'react'
import { useAuth } from '../../../User/AuthProvider'
import UserInfoTable from './UserInfoTable';

const UserProfile = () => {
    const auth  = useAuth();
    console.log("Current user data: ", auth)
  return (
    <div>
        <UserInfoTable/>
    </div>
  )
}

export default UserProfile