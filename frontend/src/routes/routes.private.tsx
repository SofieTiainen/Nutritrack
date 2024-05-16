import React, { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const PrivateRoute: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/nutritrack");
    }
  }, [token, navigate]);

  return token ? (
    children
  ) : (
    <>
      <Navigate to={"/nutritrack"} replace />
    </>
  );
};
