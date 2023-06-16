import classes from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "./CartButton";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { cartActions } from "../../store/cart-slice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  const [cartDisplay, setCardDisplay] = useState({
    width: "0%",
    padding: "0",
    overflow: "hidden",
  });
  const cart = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);


  const subtractHandler = (cartId) => {
    dispatch(cartActions.removeItemFromCart(cartId));

    dispatch(cartActions.getTotalQuantity());

    dispatch(cartActions.getTotalAmount());
  };

  const addHandler = (item) => {
    dispatch(
      cartActions.addItemToCart({
        defaultImage: item.defaultImage,
        cartId: item.cartId,
        productId: item.productId,
        name: item.name,
        size: item.size,
        price: item.price,
        colorId: item.colorId,
        type: item.type,
        quantity: 1,
      })
    );

    dispatch(cartActions.getTotalQuantity());

    dispatch(cartActions.getTotalAmount());
  };

  const cartItems = cart?.map((items, index) => (
    <div className={classes.items} key={index}>
      <div className={classes.image}>
        <img src={items.defaultImage} alt={items.name} />
      </div>
      <div className={classes.details}>
        <p>{items.name}</p>
        <p>{items.type}</p>
        <p>{items.size}</p>
        <div className={classes.price}>
          <p>
            &#8369;
            {items?.price?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <div className={classes.quantity}>
            <span onClick={subtractHandler.bind(null, items.cartId)}>-</span>
            <p>x {items.quantity}</p>
            <span onClick={addHandler.bind(null, items)}>+</span>
          </div>
        </div>
      </div>
    </div>
  ));

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);


  const closeCartHandler = () => {
    setCardDisplay({ width: "0%", padding: "0", overflow: "hidden" });
  };

  const openCartHandler = () => {
    if (cart.length === 0) {
      navigate("/bag");
    } else {
      setCardDisplay({ width: "450px" });
      if (screenSize.width <= 667) {
        setCardDisplay({ width: "100%" });
      }
    }
  };

  return (
    <>
      <section className={classes["cart-section"]}>
        <div className={classes.cart}>
          <span>{totalQuantity}</span>
          <CartButton onClick={openCartHandler} />
        </div>
        <div className={classes["cart-items"]} style={cartDisplay}>
          <span>
            <IoClose
              className={classes.icon}
              size={30}
              onClick={closeCartHandler}
            />
          </span>
          {cart.length === 0 ? (
            <p className={classes.empty}>Your Cart Is Empty!</p>
          ) : (
            <>
              <div className={classes.cartItems}>{cartItems}</div>
              <div className={classes.total}>
                <p>
                  total:{" "}
                  <span>
                    &#8369;
                    {totalAmount?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>
              <div className={classes.checkout}>
                <Link to="/bag">proceed</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
