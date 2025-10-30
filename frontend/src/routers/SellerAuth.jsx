import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerAuthRoute = ({ children }) => {
  const { token } = useSelector((state) => state.seller || {});
  return token ? children : <Navigate to="/seller/login" replace />;
};

export default SellerAuthRoute;
