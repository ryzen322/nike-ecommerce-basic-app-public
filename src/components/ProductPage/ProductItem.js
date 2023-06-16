import { Link } from "react-router-dom";
import classes from "./ProductItem.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductColors from "./ProductColors";
import { shoesActions } from "../store/shoe-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shoesActions.resetSingleData());
  }, [dispatch]);

  const [colorDisplay, setColorDisplay] = useState(false);
  const [detailsDisplay, setDetailDisplay] = useState(true);
  const [colors, setColors] = useState([]);
  const [colorId, setColorId] = useState();
  const [colorProducts, setColorProduct] = useState();

  let defaultColor = [
    props.colors[0].images[0],
    props.colors[0].colorId,
    props.colors,
  ];

  // yung i hindi maka equal sa 3 because its only i < that length
  useEffect(() => {
    let colorsLooped = [];
    for (let i = 0; i < props.colors.length; i++) {
      colorsLooped.push(props.colors[i]);
      setColors(colorsLooped);
    }
  }, [props.colors]);

  const mouseOverDisplay = (color, colorId) => {
    setColorProduct(color);
    setColorId(colorId);
  };

  const imageColors = colors.map((color) => (
    <ProductColors
      colorId={color.colorId}
      key={color.colorId}
      src={color.images[0]}
      alt={props.name}
      mouseOver={mouseOverDisplay}
      color={color}
    />
  ));

  const displayShoesColors = () => {
    setColorDisplay(true);
    setDetailDisplay(false);
  };

  const hideShoesColors = () => {
    setDetailDisplay(true);
    setColorDisplay(false);
  };

  return (
    <li className={classes.card}>
      <Link
        to={`/product-page/${props.type}/${props.id}/${
          colorId || defaultColor[1]
        }`}
        onMouseEnter={displayShoesColors}
        onMouseLeave={hideShoesColors}
      >
        <div className={classes["image-section"]}>
          <img
            src={
              colors.length > 1
                ? colorProducts || defaultColor[0]
                : defaultColor[0]
            }
            alt={props.name}
          />
        </div>
        <div className={classes["detail-section"]}>
          <div className={classes.details}>
            {colors.length > 1
              ? detailsDisplay && (
                  <div className={classes.detail}>
                    <h2>{props.name}</h2>
                    <p>{props.type}</p>
                  </div>
                )
              : colors.length === 1 && (
                  <div className={classes.detail}>
                    <h2>{props.name}</h2>
                    <p>{props.type}</p>
                  </div>
                )}
            {colors.length > 1 && colorDisplay && (
              <div className={classes.colors}>{imageColors}</div>
            )}
            <div className={classes.price}>
              <p>
                &#8369;
                {props.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
