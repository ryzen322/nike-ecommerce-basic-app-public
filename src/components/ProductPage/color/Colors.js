import { useDispatch, useSelector } from "react-redux";
import classes from "./Colors.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ColorSlides from "./ColorSlides";
import { shoesActions } from "../../store/shoe-slice";

const Colors = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { colorId } = params;

  dispatch(shoesActions.assignColor(colorId));

  const selectedColor = useSelector((state) => state.shoes.selectedColor);

  let defaultImage = selectedColor?.images[0];

  useEffect(() => {
    if (location) {
      setColorChanged(false);
    }
  }, [location]);

  const [displayImage, setDisplayImage] = useState("");
  const [colorChanged, setColorChanged] = useState(false);

  const mouseOverHandler = (data) => {
    setDisplayImage(data);
    setColorChanged(true);
  };

  const imageSlides = selectedColor?.images?.map((image, index) => (
    <ColorSlides
      key={image + index}
      src={image}
      alt={index}
      mouseOver={mouseOverHandler}
    />
  ));

  return (
    <section className={classes["color-sections"]}>
      <div className={classes.slides}>{imageSlides}</div>
      <div className={classes.image}>
        <img
          src={!colorChanged ? defaultImage : displayImage}
          alt={selectedColor?.colorId}
        />
      </div>
    </section>
  );
};

export default Colors;
