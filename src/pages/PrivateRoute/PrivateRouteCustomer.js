import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataContext } from '../../Contexts/UserContext'

const PrivateRouteCustomer = ({ children }) => {
  const { userContext } = useContext(UserDataContext)

  return userContext.JWT ? children : <Navigate to={'/login'} />
}

export default PrivateRouteCustomer