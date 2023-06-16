import "./DisplaySlides.module.scss";

const DisplaySlides = (props) => {
  const mouseOverHandler = () => {
    props.mouseOver(props.src, props.alt);
  };
  return (
    <>
      <img onMouseOver={mouseOverHandler} src={props.src} alt={props.alt} />
    </>
  );
};

export default DisplaySlides;
