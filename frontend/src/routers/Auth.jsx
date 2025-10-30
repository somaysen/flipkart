// src/routes/AuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer || {});

  return user ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
