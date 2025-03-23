import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { request } from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enums/request.methods";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const validateToken = async () => {
    const response = await request({
      method: requestMethods.GET,
      route:"/guest/validate-token",
    });

    if (!response.success) {
      setLoading(false);
      setIsAuth(false);
      localStorage.clear();
    } else {
      setLoading(false);
      setIsAuth(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      setIsAuth(false);
      localStorage.clear();
    } else {
      validateToken(token);
      console.log("Token is valid");
    }
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
