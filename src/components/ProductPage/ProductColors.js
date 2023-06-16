import classes from "./ProductColors.module.scss";

const ProductColors = (props) => {
  const mouseOverHandler = () => {
    props.mouseOver(props.color.images[0], props.color.colorId);
  };

  return (
    <section className={classes["product-colors"]}>
      <img
        // colorId={props.colorId}
        src={props.src}
        alt={props.alt}
        onMouseOver={mouseOverHandler}
      />
    </section>
  );
};

export default ProductColors;
