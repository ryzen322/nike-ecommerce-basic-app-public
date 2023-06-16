import { Link, NavLink, useLocation } from "react-router-dom";
import classes from "./Header.module.scss";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentWidth());

  function getCurrentWidth() {
    return {
      width: window.innerWidth,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentWidth());
      if (screenSize.width <= 768 && toggle === true) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", updateDimension);

    if (toggle) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize, toggle]);

  useEffect(() => {
    if (location) {
      setToggle(false);
    }
  }, [location]);

  const menuActiveHandler = () => {
    setToggle((e) => !e);
  };

  return (
    <section className={classes["header-section"]}>
      <div className={classes.logo}>
        <Link to="/">
          <h3>NIKE</h3>
        </Link>
      </div>
      <nav>
        <div className={classes.burger} onClick={menuActiveHandler}>
          <div
            className={
              !toggle ? classes["burger-bar"] : classes["burger-bar-active"]
            }
          ></div>
          <div
            className={
              !toggle ? classes["burger-bar"] : classes["burger-bar-active"]
            }
          ></div>
          <div
            className={
              !toggle ? classes["burger-bar"] : classes["burger-bar-active"]
            }
          ></div>
        </div>
      </nav>
      <div className={!toggle ? classes.menu : classes["menu-active"]}>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="product-page"
            >
              Product Page
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Header;
