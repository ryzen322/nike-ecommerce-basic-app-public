import { Link } from "react-router-dom";
import classes from "./SliderItem.module.scss";

const SliderItem = (props) => {
  let defaultColor = [props.colors[0].images[0], props.colors[0].colorId];

  return (
    <div className={classes.card}>
      <Link to={`/product-page/${props.type}/${props.id}/${defaultColor[1]}`}>
        <div className={classes["image-section"]}>
          <img src={defaultColor[0]} alt={props.name} />
        </div>
        <div className={classes["detail-section"]}>
          <div className={classes.section1}>
            <h2>{props.name}</h2>
            <p>{props.type}</p>
          </div>
          <div className={classes.section2}>
            <p>&#8369; {props.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SliderItem;
