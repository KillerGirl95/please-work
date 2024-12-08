import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react';

const Profile = () => {
  const { user } = useAuthContext()

  return (
    <div className="profile">
      <h2>My Profile</h2>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )

}

export default Profile