import classes from "./Pickup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkoutActions } from "../store/checkout-slice";
import { useState } from "react";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";

const Pickup = () => {
  const navigate = useNavigate();
  const [displayAddress, setDisplayAddress] = useState("");
  const [displayFullAddress, setDisplayFullAddress] = useState("");

  const [getBranchFullAddress, setGetBranchFullAddress] = useState("");
  const [getBranchContactNum, setGetBranchContactNum] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  dispatch(checkoutActions.pickup());

  const selectValueHandler = (e) => {
    const selectValue = e.target.value;
    if (selectValue === "") {
      setDisplayAddress("");
      setDisplayFullAddress("");
    } else if (selectValue === "cebu") {
      setDisplayAddress(<p>nike ayala cebu</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike Ayala Cebu</h3>
          <p>Stall 125B, 125D, 130A Level 1</p>
          <p>Ayala Center Cebu</p>
          <p>6000 Archbishop Reyes Ave Cebu City, Philippines</p>
          <p>+63 324251438</p>
        </div>
      );
      setGetBranchFullAddress(
        `Nike Ayala Cebu, 
        Stall 125B, 125D, 
        130A Level 1, 
        Ayala Center Cebu, 
        6000 Archbishop Reyes Ave Cebu City, 
        Philippines`
      );
      setGetBranchContactNum(`+63 324251438`);
    } else if (selectValue === "muntinlupa") {
      setDisplayAddress(<p>nike by ATC</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike by ATC</h3>
          <p>Ground Floor, Alabang Town Center</p>
          <p>Commerce Avenue Corner Madrigal Avenue</p>
          <p>1780 Alabang, Philippines</p>
          <p>+639178652270</p>
        </div>
      );
      setGetBranchFullAddress(
        `
        Nike by ATC, 
        Ground Floor, 
        Alabang Town Center, 
        Commerce Avenue Corner Madrigal Avenue, 
        1780 Alabang, 
        Philippines`
      );
      setGetBranchContactNum(`+639178652270`);
    } else if (selectValue === "angeles") {
      setDisplayAddress(<p>nike clark</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike Clark</h3>
          <p>G/F SM City Clark, Manuel A Roxas Avenue</p>
          <p>Clark Freeport Zone</p>
          <p>2009 Malabanias, Philippines</p>
          <p>+ (045) 499 9698</p>
        </div>
      );
      setGetBranchFullAddress(
        `
        Nike Clark, 
        G/F SM City Clark, 
        Manuel A Roxas Avenue, 
        Clark Freeport Zone, 
        2009 Malabanias, 
        Philippines
        `
      );
      setGetBranchContactNum(`+ (045) 499 9698`);
    } else if (selectValue === "taguig") {
      setDisplayAddress(<p>nike fort</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike Fort</h3>
          <p>G/F B3 Bonifacio High Street</p>
          <p>9th Ave</p>
          <p>1202 Taguig, Philippines</p>
          <p>+63 917 865 2263</p>
        </div>
      );
      setGetBranchFullAddress(
        `
        Nike Fort, 
        G/F B3 Bonifacio High Street, 
        9th Ave, 
        1202 Taguig, Philippines
        `
      );
      setGetBranchContactNum(`+63 917 865 2263`);
    } else if (selectValue === "makati") {
      setDisplayAddress(<p>nike glorietta</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike Glorietta</h3>
          <p>Unit 221 TO 225 and 227, 2/F GLORIETTA 3</p>
          <p>Ayala Center</p>
          <p>1224 Makati, Philippines</p>
          <p>+63 917 855 2810</p>
        </div>
      );
      setGetBranchFullAddress(
        `
        Nike Glorietta, 
        Unit 221 TO 225 and 227, 2/F GLORIETTA 3, 
        Ayala Center, 
        1224 Makati, Philippines
        `
      );
      setGetBranchContactNum(`+63 917 855 2810`);
    } else if (selectValue === "manila") {
      setDisplayAddress(<p>nike mall of asia</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike Mall of Asia</h3>
          <p>102AB, 102E-L, 103-107B</p>
          <p>1st Floor ENTERTAINMENT MALL SOUTH Area</p>
          <p>1300 Pasay City, Philippines</p>
          <p>+63 2 855 96083</p>
        </div>
      );
      setGetBranchFullAddress(
        `
        Nike Mall of Asia, 
        102AB, 102E-L, 103-107B, 
        1st Floor ENTERTAINMENT MALL SOUTH Area, 
        1300 Pasay City, Philippines
        `
      );
      setGetBranchContactNum(`+63 2 855 96083`);
    } else if (selectValue === "quezon-city") {
      setDisplayAddress(<p>nike north edsa</p>);
      setDisplayFullAddress(
        <div className={classes["pickup-full-address"]}>
          <h3>Nike North Edsa</h3>
          <p>Unit CC-273,274,275E,276A-F</p>
          <p>2ND Floor MAIN BLDG</p>
          <p>1100 SM CITY NORTH EDSA QUEZON CITY, Philippines</p>
          <p>+63 2 871 21058</p>
        </div>
      );
      setGetBranchFullAddress(
        `
        Nike North Edsa, 
        Unit CC-273,274,275E,276A-F, 
        2ND Floor MAIN BLDG, 
        1100 SM CITY NORTH EDSA QUEZON CITY, Philippines
        `
      );
      setGetBranchContactNum(`+63 2 871 21058`);
    }
  };

  const onSubmitPickupHandler = (e) => {
    e.preventDefault();
    dispatch(
      checkoutActions.addOrder({
        order: cart,
        totalAmount: totalAmount,
        pickupBranchAddress: getBranchFullAddress,
        branchContactNum: getBranchContactNum,
      })
    );

    setCheckoutComplete(true);
  };

  const closeClickHandler = () => {
    dispatch(cartActions.resetCart());
    dispatch(checkoutActions.resetOrder());
    navigate("/product-page");
  };

  return (
    <>
      {checkoutComplete && (
        <Modal>
          <div className={classes["order-successful"]}>
            <div>
              <p>Order Successfully!</p>
              <button onClick={closeClickHandler}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      <section className={classes["pickup-section"]}>
        <form onSubmit={onSubmitPickupHandler}>
          <div className={classes.heading}>
            <h2>where would you like to pickup your order?</h2>
          </div>
          <div className={classes["pickup-location"]}>
            <div className={classes.location}>
              <label htmlFor="city">city</label>
              <select
                id="city"
                onChange={selectValueHandler}
                defaultValue="Select City"
                defaultChecked="Select City"
              >
                <option value="">select a city</option>
                <option value="cebu">cebu</option>
                <option value="muntinlupa">muntinlupa</option>
                <option value="angeles">angeles</option>
                <option value="taguig">taguig</option>
                <option value="makati">makati</option>
                <option value="manila">manila</option>
                <option value="quezon-city">quezon city</option>
              </select>
            </div>
            <div className={classes.pickup}>
              {displayAddress && (
                <>
                  <div className={classes.heading}>
                    <h3>Select a Pickup Location</h3>
                  </div>

                  <div className={classes.inputs}>
                    <input
                      type="radio"
                      id="cebu"
                      name="cebu"
                      value="cebu"
                      // onChange={(e) => setSizeValue(e.target.value)}
                    />
                    <label htmlFor="cebu">
                      <div className={classes["upper-part"]}>
                        {displayAddress}
                        <p>P250</p>
                      </div>
                      <div className={classes["date-arrival"]}>
                        <p>arrives sun. jun 25 - sun, jul2</p>
                      </div>
                    </label>
                  </div>
                </>
              )}
            </div>
            {displayFullAddress && displayFullAddress}
          </div>
          <div className={classes.action}>
            {displayAddress !== "" && cart.length !== 0 ? (
              <button>continue</button>
            ) : (
              <button className={classes.disabled} disabled>
                continue
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Pickup;
