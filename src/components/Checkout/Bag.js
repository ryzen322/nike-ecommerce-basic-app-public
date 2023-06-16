import { useDispatch, useSelector } from "react-redux";
import classes from "./Bag.module.scss";
import { cartActions } from "../store/cart-slice";
import { useNavigate } from "react-router-dom";

const Bag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const otherFees = 250;

  const onChangeSizeValue = (sizeValue, item) => {
    dispatch(cartActions.updateSizeInBag({ newSize: sizeValue, cartId: item }));
  };

  const onChangeQuantityValue = (quantityValue, item) => {
    dispatch(
      cartActions.updateQuantityInBag({
        newQuantity: parseFloat(quantityValue),
        cartId: item,
      })
    );

    dispatch(cartActions.getTotalQuantity());

    dispatch(cartActions.getTotalAmount());
  };

  const onClickRemoveHandler = (cartId) => {
    dispatch(cartActions.removeFromItems(cartId));

    dispatch(cartActions.getTotalQuantity());

    dispatch(cartActions.getTotalAmount());
  };

  const cartItems = cart.map((item, index) => (
    <div className={classes.box} key={index}>
      <div className={classes.image}>
        <img src={item.defaultImage} alt={item.name} />
      </div>
      <div className={classes["all-details"]}>
        <div className={classes.details}>
          <p>{item.name}</p>
          <p>{item.type}'s shoes</p>
          <p>
            &#8369;
            {item.price?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>

          <div className={classes["size-quantity"]}>
            <div className={classes.size}>
              <label htmlFor="cars">Size</label>
              <select
                id="size"
                name="size"
                value={item.size}
                onChange={(e) => onChangeSizeValue(e.target.value, item.cartId)}
              >
                <option value="7">7</option>
                <option value="7.5">7.5</option>
                <option value="8">8</option>
                <option value="8.5">8.5</option>
                <option value="9">9</option>
                <option value="9.5">9.5</option>
                <option value="10">10</option>
                <option value="10.5">10.5</option>
                <option value="11">11</option>
                <option value="11.5">11.5</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className={classes.quantity}>
              <label htmlFor="quantity">Quantity</label>
              <select
                id="quantity"
                name="qunatity"
                value={item.quantity}
                onChange={(e) =>
                  onChangeQuantityValue(e.target.value, item.cartId)
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div
              className={classes.remove}
              onClick={onClickRemoveHandler.bind(null, item.cartId)}
            >
              <p>remove</p>
            </div>
          </div>
        </div>
        <div className={classes["total-price"]}>
          <p>
            &#8369;
            {(item.price * item.quantity).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  ));

  const onGoToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <section className={classes["bag-section"]}>
      <div className={classes.container}>
        <div className={classes["cart-items"]}>
          <h2>Bag</h2>
          <div className={classes.items}>{cartItems}</div>
        </div>
        <div className={classes.summary}>
          <div className={classes.title}>
            <h1>summary</h1>
          </div>
          <div className={classes["total-details"]}>
            <div className={classes.subtotal}>
              <p>subtotal </p>
              {totalAmount !== undefined ? (
                <p>
                  &#8369;
                  {totalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              ) : (
                <p>&#8369;0.00</p>
              )}
            </div>
            <div className={classes["extra-charges"]}>
              <p>estimated delivery & handling</p>
              {cart.length !== 0 ? (
                <p>&#8369;{otherFees.toFixed(2)}</p>
              ) : (
                <p>&#8369;0.00</p>
              )}
            </div>
            <div className={classes.total}>
              <p>total </p>
              {totalAmount !== undefined ? (
                <p>
                  &#8369;
                  {(totalAmount + otherFees).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              ) : (
                <p>&#8369;0.00</p>
              )}
            </div>
          </div>
          <div className={classes.action}>
            {cart.length === 0 ? (
              <button className={classes.disabled} disabled>
                checkout
              </button>
            ) : (
              <button
                onClick={onGoToCheckoutHandler}
                className={classes.enabled}
              >
                checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bag;
