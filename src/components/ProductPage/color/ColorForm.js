import { useState } from "react";
import ColorData from "./ColorData";
import classes from "./ColorForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

// helpers
const isEmpty = (value) => value.trim() === "";

const ColorForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formsValidty, setFormValidity] = useState({
    name: true,
    size: true,
    price: true,
    color: true,
    type: true,
  });
  const isSizeExist = useSelector((state) => state.cart.isSizeExist);

  const { productId, colorId } = useParams();
  const [sizeValue, setSizeValue] = useState("");

  const singleData = useSelector((state) => state.shoes.singleData);

  const selectedColor = useSelector((state) => state.shoes.selectedColor);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const productIdIsValid = !isEmpty(productId);
    const nameIsValid = !isEmpty(singleData.name);
    const priceIsValid = !isEmpty(singleData.price.toString());
    const sizeIsValid = !isEmpty(sizeValue);
    const typeIsValid = !isEmpty(singleData.type);
    const colorIdIsValid = !isEmpty(colorId);

    setFormValidity({
      productId: productIdIsValid,
      name: nameIsValid,
      size: sizeIsValid,
      price: priceIsValid,
      colorId: colorIdIsValid,
      type: typeIsValid,
    });

    const formIsValid =
      productIdIsValid &&
      nameIsValid &&
      sizeIsValid &&
      priceIsValid &&
      colorIdIsValid &&
      typeIsValid;

    if (!formIsValid) {
      return;
    }

    // if form is valid
    // add codes here ...
    dispatch(
      cartActions.addItemToCart({
        defaultImage: selectedColor?.images[0],
        cartId: productId + colorId + Math.floor(Math.random() * 100),
        productId: productId,
        name: singleData.name,
        size: sizeValue,
        price: singleData.price,
        colorId: colorId,
        type: singleData.type,
      })
    );

    dispatch(cartActions.getTotalQuantity());
    dispatch(cartActions.getTotalAmount());

    navigate(-1);
  };

  return (
    <form className={classes["form-section"]} onSubmit={onSubmitHandler}>
      <ColorData onSubmitHandler={onSubmitHandler} />
      <div className={classes.sizes}>
        <div className={classes["size-guide"]}>
          <p>select sizes</p>
          <p>size guide</p>
        </div>
        {!formsValidty.size && (
          <p className={classes.invalid}>Please Select Your Shoe Size.</p>
        )}
        {isSizeExist && (
          <p className={classes.invalid}>
            Same Shoes With The Same Size Already Exist In Your Cart.
          </p>
        )}
        <div className={classes["available-sizes"]}>
          <div>
            <input
              type="radio"
              id="size7"
              name="size"
              value="7"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size7">US 7</label>
          </div>
          <div>
            <input
              type="radio"
              id="size7.5"
              name="size"
              value="7.5"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size7.5">US 7.5</label>
          </div>
          <div>
            <input
              type="radio"
              id="size8"
              name="size"
              value="8"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size8">US 8</label>
          </div>
          <div>
            <input
              type="radio"
              id="size8.5"
              name="size"
              value="8.5"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size8.5">US 8.5</label>
          </div>
          <div>
            <input
              type="radio"
              id="size9"
              name="size"
              value="9"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size9">US 9</label>
          </div>
          <div>
            <input
              type="radio"
              id="size9.5"
              name="size"
              value="9.5"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size9.5">US 9.5</label>
          </div>
          <div>
            <input
              type="radio"
              id="size10"
              name="size"
              value="10"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size10">US 10</label>
          </div>
          <div>
            <input
              type="radio"
              id="size10.5"
              name="size"
              value="10.5"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size10.5">US 10.5</label>
          </div>
          <div>
            <input
              type="radio"
              id="size11"
              name="size"
              value="11"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size11">US 11</label>
          </div>
          <div>
            <input
              type="radio"
              id="size11.5"
              name="size"
              value="11.5"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size11.5">US 11.5</label>
          </div>
          <div>
            <input
              type="radio"
              id="size12"
              name="size"
              value="12"
              onChange={(e) => setSizeValue(e.target.value)}
            />
            <label htmlFor="size12">US 12</label>
          </div>
        </div>
      </div>
      <div className={classes.button}>
        <button>add to bag</button>
      </div>
    </form>
  );
};

export default ColorForm;
