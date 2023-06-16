import classes from "./DisplayColors.module.scss";

const DisplayColors = (props) => {
  const clickHandler = () => {
    props.chooseColorHandler(props.color.images);
  };

  return <img src={props.src} alt={props.alt} onClick={clickHandler} />;
};

export default DisplayColors;
