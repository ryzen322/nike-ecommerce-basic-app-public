// import { fetchShoeData } from "../store/shoe-actions";
import classes from "./FilterData.module.scss";
import { NavLink } from "react-router-dom";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";

const FilterData = () => {
  const [toggle, setToggle] = useState(false);

  const toggleFilterHandler = () => {
    setToggle((e) => !e);
  };

  return (
    <>
      <section className={classes["filter-section"]}>
        <button
          className={classes["responsive-filter"]}
          onClick={toggleFilterHandler}
        >
          <p>filter</p> <BsFilter className={classes["filter-icon"]} />
        </button>
        <div className={!toggle ? classes.filters : classes["filters-active"]}>
          <NavLink
            to="/product-page"
            end
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            all
          </NavLink>

          <NavLink
            to="/product-page/men"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            men
          </NavLink>

          <NavLink
            to="/product-page/women"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            women
          </NavLink>

          <NavLink
            to="/product-page/kids"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            kids
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default FilterData;
