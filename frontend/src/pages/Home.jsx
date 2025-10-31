import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCardEffect from "../effects/HomeCardEffect";
import { fetchProducts } from "../store/actons/productActions";
import AllProduct from "../products/AllProduct";

function Home() {

  return (
    <div className="w-full min-h-screen px-2 overflow-hidden flex flex-col items-center justify-start gap-5">
      {/* Top Banner Slider */}
      <HomeCardEffect />

      {/* Products Section */}
      <AllProduct/>

    </div>
  );
}

export default Home;
