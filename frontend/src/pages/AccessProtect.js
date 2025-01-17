import React from "react";
import { Navigate } from "react-router-dom";

const AccessRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AccessRoute;
