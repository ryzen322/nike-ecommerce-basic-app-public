import classes from "./ColorSlides.module.scss";

const ColorSlides = (props) => {
  const mouseOverHandler = () => {
    props.mouseOver(props.src);
  };

  return (
    <>
      <div className={classes.display} onMouseOver={mouseOverHandler}>
        <img alt={props.alt} src={props.src} />
      </div>
    </>
  );
};

export default ColorSlides;
