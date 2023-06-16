import { NavLink, Outlet } from "react-router-dom";
import classes from "./Checkout.module.scss";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const otherFee = 250;
  const cart = useSelector((state) => state.cart.items);

  const cartItems = cart.map((item, index) => (
    <div className={classes["cart-container"]} key={index}>
      <div className={classes.image}>
        <img src={item.defaultImage} alt={item.name} />
      </div>
      <div className={classes.details}>
        <p>{item.name}</p>
        <p>Qty {item.quantity}</p>
        <p>Size {item.size}</p>
        <p>
          &#8369;
          {item.price}
        </p>
      </div>
    </div>
  ));

  return (
    <section className={classes["checkout-section"]}>
      <div className={classes.forms}>
        <div className={classes.choices}>
          <h2>how would you like to get your order?</h2>
        </div>
        <div className={classes.actions}>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to={`deliver`}
            replace="true"
          >
            deliver it
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to={`pickup`}
            replace="true"
          >
            pick it up
          </NavLink>
        </div>
        <Outlet />
      </div>
      <div className={classes.summary}>
        <div className={classes.title}>
          <h2>order summmary</h2>
        </div>
        <div className={classes["order-summary"]}>
          <div className={classes.subtotal}>
            <p>subtotal</p>
            <p>
              &#8369;
              {totalAmount?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className={classes.shipping}>
            <p>delivery/shipping</p>
            <p>
              &#8369;
              {otherFee.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className={classes["overall-total"]}>
            <p>total</p>
            <p>
              &#8369;
              {(totalAmount + otherFee).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className={classes["orders-images"]}>{cartItems}</div>
      </div>
    </section>
  );
};

export default Checkout;
