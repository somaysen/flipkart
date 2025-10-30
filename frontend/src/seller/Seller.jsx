import React, { useState } from "react";
import { useSelector } from "react-redux";
import SellerProducts from "./SellerProdect";
import SellerLogin from "./SellerLogin";
import SellerRegister from "./SellerRegister";

function Seller() {
  const { seller } = useSelector((state) => state.sellerAuth || {});
  const [showRegister, setShowRegister] = useState(false);

  // 🔄 If logged in → show products
  if (seller && seller.token) {
    return <SellerProducts />;
  }

  // 🔐 Otherwise → login or register screen
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      {showRegister ? (
        <SellerRegister onSwitch={() => setShowRegister(false)} />
      ) : (
        <SellerLogin onSwitch={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default Seller;
