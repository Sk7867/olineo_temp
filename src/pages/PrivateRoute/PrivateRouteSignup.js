import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataContext } from '../../Contexts/UserContext'

const PrivateRouteSignup = ({ children }) => {
  const { userContext } = useContext(UserDataContext)

  return userContext.fullName || userContext.mobileNumber ? children : <Navigate to={'/signup'} />
}

export default PrivateRouteSignup