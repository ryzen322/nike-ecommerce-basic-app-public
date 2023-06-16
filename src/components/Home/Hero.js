import heroVideo from "../../assets/vids/one-day-we-wont-need-this-day.mp4";
import classes from "./Hero.module.scss";

const Hero = () => {
  return (
    <>
      <video src={heroVideo} autoPlay controls loop={true} type="video/mp4" className={classes.video} />
    </>
  );
};

export default Hero;
