// src/routes/AuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user || {});

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
