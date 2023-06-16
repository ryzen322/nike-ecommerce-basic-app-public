import classes from "./Essentials.module.scss";
import { Link } from "react-router-dom";

const Essentials = () => {
  return (
    <section className={classes["essentials-section"]}>
      <div className={classes.heading}>
        <h1>the essentials</h1>
      </div>
      <div className={classes.essentials}>
        <Link to="/product-page/women">
          <div className={classes.women}>
            <div className={classes.content}>
              <div className={classes["inner-content"]}>
                <p>women</p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/product-page/men">
          <div className={classes.men}>
            <div className={classes.content}>
              <div className={classes["inner-content"]}>
                <p>men</p>
              </div>
            </div>
          </div>
        </Link>
        <div className={classes.kids}>
          <Link to="/product-page/kids">
            <div className={classes["kids-div"]}>
              <div className={classes.content}>
                <div className={classes["inner-content"]}>
                  <p>kids</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/product-page">
            <div className={classes["all-div"]}>
              <div className={classes.content}>
                <div className={classes["inner-content"]}>
                  <p>all</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Essentials;
