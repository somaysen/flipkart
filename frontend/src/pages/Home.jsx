import HomeCardEffect from "../effects/HomeCardEffect";
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
