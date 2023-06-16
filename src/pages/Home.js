import Hero from "../components/Home/Hero";
import FindYourGreatness from "../components/Home/Greatness";
import Essentials from "../components/Home/Essentials";
import Latest from "../components/Home/Latest";
import Fly from "../components/Home/Fly";
import Slider from "../components/Home/carousel/Slider";

const Home = () => {
  return (
    <>
      <Hero />
      <FindYourGreatness />
      <Essentials />
      <Slider />
      <Fly />
      <Latest />
    </>
  );
};

export default Home;
