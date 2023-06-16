import { Link } from "react-router-dom";
import classes from "./Greatness.module.scss";

const Greatness = () => {
  return (
    <section className={classes["greatness-section"]}>
      <div className={classes.part1}>
        <p>workout essentials</p>
        <h1>find your greatness</h1>
      </div>
      <div className={classes.part2}>
        <p>never settle, never done.</p>
        <p>Get what you need to start your journey.</p>
      </div>
      <div className={classes.button}>
        <Link to="/product-page">
          <button>shop</button>
        </Link>
      </div>
    </section>
  );
};

export default Greatness;
