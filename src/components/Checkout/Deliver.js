import classes from "./Deliver.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkoutActions } from "../store/checkout-slice";
import { useEffect, useRef, useState } from "react";
import SelectCountry from "./SelectCountry";
import { cartActions } from "../store/cart-slice";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";

// helpers
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const Deliver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  dispatch(checkoutActions.deliver());

  const [getCountry, setGetCountry] = useState();
  const [error, setError] = useState(false);
  const [getSelectValue, setSelectValue] = useState();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const onChangeHandlerSelect = (e) => {
    setSelectValue(e.target.value);
  };

  //

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    const success = (position) => {
      setError(false);

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(geoApiUrl)
        .then((res) => res.json())
        .then((data) => setGetCountry(data.countryName));
    };

    const error = () => {
      setError(true);
      setGetCountry("Unable to retrieve your location. Choose here instead.");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  //

  const [formInputsValidity, setFormInputValidity] = useState({
    firstName: true,
    lastName: true,
    address1: true,
    province: true,
    city: true,
    postalCode: true,
    barangay: true,
    country: true,
    email: true,
    phoneNumber: true,
  });

  const firstName = useRef();
  const lastName = useRef();
  const address1 = useRef();
  const province = useRef();
  const city = useRef();
  const postalCode = useRef();
  const barangay = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const checkBox = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredFirstName = firstName.current.value;
    const enteredLasttName = lastName.current.value;
    const enteredAddress1 = address1.current.value;
    const enteredProvince = province.current.value;
    const enteredCity = city.current.value;
    const enteredPostalCode = postalCode.current.value;
    const enteredBarangay = barangay.current.value;
    const enteredCountryThruLocation = getCountry;
    const enteredEmail = email.current.value;
    const enteredPhoneNumber = phoneNumber.current.value;
    const checkedBox = checkBox.current.checked;

    // validate
    const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
    const enteredLastNameIsValid = !isEmpty(enteredLasttName);
    const enteredAddress1IsValid = !isEmpty(enteredAddress1);
    const enteredProvinceIsValid = !isEmpty(enteredProvince);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredBarangayIsValid = !isEmpty(enteredBarangay);
    const enteredCountryIsValid = getSelectValue !== undefined;
    const enteredCountryThruLocationisValid = !isEmpty(
      enteredCountryThruLocation
    );
    const enteredEmailIsValid = enteredEmail.match(validRegex);
    const enteredPhoneNumberIsValid = enteredPhoneNumber.match(phoneno);

    setFormInputValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      address1: enteredAddress1IsValid,
      province: enteredProvinceIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      barangay: enteredBarangayIsValid,
      country: enteredCountryIsValid || enteredCountryThruLocationisValid,
      email: enteredEmailIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
      checkBox: checkedBox,
    });

    const formIsValid =
      (enteredFirstNameIsValid &&
        enteredLastNameIsValid &&
        enteredAddress1IsValid &&
        enteredProvinceIsValid &&
        enteredCityIsValid &&
        enteredPostalCodeIsValid &&
        enteredBarangayIsValid &&
        enteredCountryIsValid) ||
      (enteredCountryThruLocationisValid &&
        enteredEmailIsValid &&
        enteredPhoneNumberIsValid &&
        checkedBox);

    if (!formIsValid) {
      return;
    } else {
      dispatch(
        checkoutActions.addOrder({
          firstName: enteredFirstName,
          lastName: enteredLasttName,
          address1: enteredAddress1,
          province: enteredProvince,
          city: enteredCity,
          postalCode: enteredPostalCode,
          barangay: enteredBarangay,
          country: getSelectValue || getCountry,
          email: enteredEmail,
          phoneNumber: enteredPhoneNumber,
          order: cart,
          totalAmount: totalAmount,
        })
      );

      setCheckoutComplete(true);
    }
  };

  const firstNameControlClasses = `${classes.control} ${
    formInputsValidity.firstName ? "" : classes.invalid
  }`;
  const lasttNameControlClasses = `${classes.control} ${
    formInputsValidity.lastName ? "" : classes.invalid
  }`;
  const address1ControlClasses = `${classes.control} ${
    formInputsValidity.address1 ? "" : classes.invalid
  }`;
  const provinceControlClasses = `${classes.control} ${
    formInputsValidity.province ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const barangayControlClasses = `${classes.control} ${
    formInputsValidity.barangay ? "" : classes.invalid
  }`;
  const countryControlClasses = `${classes.control} ${
    formInputsValidity.country ? "" : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;
  const phoneNumberControlClasses = `${classes.control} ${
    formInputsValidity.phoneNumber ? "" : classes.invalid
  }`;
  const checkBoxControlClasses = `${classes.control} ${
    formInputsValidity.checkBox ? "" : classes.invalid
  }`;

  const closeClickHandler = () => {
    // navigate home
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

      <form className={classes["deliver-form"]} onSubmit={confirmHandler}>
        <div className={classes[`personal-info`]}>
          <div className={classes.heading}>
            <h2>enter your name and address</h2>
          </div>
          <div className={firstNameControlClasses}>
            <input type="text" placeholder="First Name" ref={firstName} />

            {!formInputsValidity.firstName ? (
              <span>Please enter a valid name.</span>
            ) : (
              <span>For Customer Clearance, please enter your Name</span>
            )}
          </div>
          <div className={lasttNameControlClasses}>
            <input type="text" placeholder="Last Name" ref={lastName} />

            {!formInputsValidity.lastName ? (
              <span>Please enter a valid name.</span>
            ) : (
              <span>For Customer Clearance, please enter your Surname</span>
            )}
          </div>
          <div className={address1ControlClasses}>
            <input type="text" placeholder="Address 1" ref={address1} />

            {!formInputsValidity.address1 ? (
              <span>Please enter a valid name.</span>
            ) : (
              <span>We do not shipt to P.O. boxes</span>
            )}
          </div>
          <div className={classes["input-second-address"]}>
            <input type="text" placeholder="Address 2/Optional" />
          </div>
          <div className={classes["address-scope"]}>
            <div className={provinceControlClasses}>
              <input
                type="text"
                placeholder="Address/Province"
                ref={province}
              />
              {!formInputsValidity.province && (
                <span>Please enter a valid input</span>
              )}
            </div>
            <div className={cityControlClasses}>
              <input type="text" placeholder="City/Municipality" ref={city} />
              {!formInputsValidity.city && (
                <span>Please enter a valid input</span>
              )}
            </div>
            <div className={postalCodeControlClasses}>
              <input type="text" placeholder="Postal Code" ref={postalCode} />
              {!formInputsValidity.postalCode && (
                <span>Please enter a valid input</span>
              )}
            </div>
            <div className={barangayControlClasses}>
              <input
                type="text"
                placeholder="Barangay/District"
                ref={barangay}
              />
              {!formInputsValidity.barangay && (
                <span>Please enter a valid input</span>
              )}
            </div>
          </div>
          <div className={classes.country}>
            {getCountry && !error && (
              <>
                <input
                  type="country"
                  placeholder="Country"
                  value={getCountry}
                />
                <span className={classes["circle-success"]}></span>
              </>
            )}
            {getCountry && error && (
              <div className={countryControlClasses}>
                <SelectCountry targetValue={onChangeHandlerSelect} />
                <span>{getCountry}</span>
              </div>
            )}
          </div>
        </div>
        <div className={classes["contact-info"]}>
          <div className={classes.heading}>
            <h2>what's your contact information?</h2>
          </div>
          <div className={emailControlClasses}>
            <input type="email" placeholder="Email" ref={email} />
            {!formInputsValidity.email ? (
              <span>Please enter a valid email</span>
            ) : (
              <span>A confirmation email will be sent after checkout</span>
            )}
          </div>
          <div className={phoneNumberControlClasses}>
            <input type="text" placeholder="Phone Number" ref={phoneNumber} />
            {!formInputsValidity.phoneNumber ? (
              <span>Please enter a valid Phone Number</span>
            ) : (
              <span>A carrier might contact you to confirm delivery</span>
            )}
          </div>
          <div className={checkBoxControlClasses}>
            <input
              type="checkbox"
              id="consent"
              name="consent"
              value="agree"
              ref={checkBox}
            />
            <label htmlFor="consent">
              I have read the consent to eShopWorld processing my information in
              accordance with the <span>Privacy Statement</span> and{" "}
              <span>Cookie Policy</span>. eShopWorld is a trusted Nike partner.
            </label>
          </div>
        </div>
        <div className={classes.action}>
          {cart.length === 0 ? (
            <button className={classes.disabled} disabled>
              continue
            </button>
          ) : (
            <button>continue</button>
          )}
        </div>
      </form>
    </>
  );
};

export default Deliver;
