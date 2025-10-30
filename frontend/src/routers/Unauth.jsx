// src/routes/UnAuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user || {});

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UnAuthRoute;
