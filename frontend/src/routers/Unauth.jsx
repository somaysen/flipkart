// src/routes/UnAuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer?.user);

  // If user is logged in → redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If not logged in → allow access to the route
  return children;
};

export default UnAuthRoute;
