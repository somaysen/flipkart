import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { verifySellerSession } from "../store/actons/sellerAction";
import { logoutSeller } from "../store/reducers/sellerSlice";

const SellerAuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { seller } = useSelector((state) => state.seller || {});

  useEffect(() => {
    // Dispatch verifySellerSession to populate Redux from server cookie
    dispatch(verifySellerSession()).unwrap().catch(() => {
      dispatch(logoutSeller());
    });
  }, [dispatch]);

  // 🔒 if no seller -> redirect to seller login
  if (!seller) {
    return <Navigate to="/seller/login" state={{ from: location }} replace />;
  }

  return children;
};

export default SellerAuthRoute;
