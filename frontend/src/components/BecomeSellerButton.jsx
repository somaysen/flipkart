import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BecomeSellerButton({ closeMenu }) {
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller); // from sellerSlice

  const handleClick = () => {
    if (seller) {
      navigate("/seller/products"); // seller logged in → go to product page
    } else {
      navigate("/seller/login"); // not logged in → go to login page
    }
    closeMenu && closeMenu();
  };

  const commonClass =
    "px-4 py-2 rounded-md transition duration-200 font-semibold";

  return (
    <button
      onClick={handleClick}
      className={`${commonClass} bg-green-500 text-white hover:bg-green-600 shadow`}
    >
      Become a Seller
    </button>
  );
}

export default BecomeSellerButton;
