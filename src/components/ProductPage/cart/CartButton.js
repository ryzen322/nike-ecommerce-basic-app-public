import classes from "./CartButton.module.scss";
import { BsFillBagFill } from "react-icons/bs";

const CartButton = (props) => {
  return (
    <section className={classes["cart-button-section"]} onClick={props.onClick}>
      <BsFillBagFill />
    </section>
  );
};

export default CartButton;
