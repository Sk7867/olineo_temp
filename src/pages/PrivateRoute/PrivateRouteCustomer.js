import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserDataContext } from "../../Contexts/UserContext";

const PrivateRouteCustomer = ({ children }) => {
  const { userContext } = useContext(UserDataContext);

  if (!sessionStorage.getItem("user")) return;

  // const token = JSON.parse(sessionStorage.getItem("user")).JWT;
  // console.log({ token });
  return children;

  // return (userContext.JWT ? children : <Navigate to={'/login'} />)
};

export default PrivateRouteCustomer;
