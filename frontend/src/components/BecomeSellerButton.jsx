import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BecomeSellerButton({ closeMenu }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.seller || {});

  const handleClick = () => {
    if (token) {
      navigate("/seller/dashboard");
    } else {
      navigate("/seller/login");
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
