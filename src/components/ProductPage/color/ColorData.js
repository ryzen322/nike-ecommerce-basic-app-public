import { NavLink, useParams } from "react-router-dom";
import classes from "./ColorData.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { shoesActions } from "../../store/shoe-slice";

const ColorData = (props) => {
  const dispatch = useDispatch();
  const { productType, productId } = useParams();

  // colors
  const colors = useSelector((state) => state.shoes.colors);

  const onClickHandler = (color) => {
    dispatch(shoesActions.assignColor(color));
  };

  const colorsData = colors.map((color, index) => (
    <NavLink
      key={index}
      to={`/product-page/${productType}/${productId}/${color.colorId}`}
      replace="true"
      onClick={onClickHandler.bind(null, color)}
      className={(navData) => (navData.isActive ? classes.active : "")}
    >
      <img src={color.images[0]} alt={color.colorId + index} />
    </NavLink>
  ));
  return <ul className={classes.color}>{colorsData}</ul>;
};

export default ColorData;
