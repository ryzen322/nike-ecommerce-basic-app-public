import { Link } from "react-router-dom";
import classes from "./Fly.module.scss";

const Fly = () => {
  return (
    <section className={classes["fly-section"]}>
      <div className={classes.part1}>
        <p>
          air jordan 1 high <span>og</span>
        </p>
        <h1>you don't need a cape to take flight</h1>
      </div>
      <div className={classes.part2}>
        <p>
          Get ready to swing into action with the upcoming Air Jordan 1 High OG
          'Next Chapter' as seen in 'Spider-Man: Across the Spider-Verse',
          exclusively in theaters. Available in full family sizing, outfit the
          whole crew and look fly in any universe.
        </p>
      </div>
      <div className={classes.button}>
        <Link to="/product-page">
          <button>shop</button>
        </Link>
      </div>
    </section>
  );
};

export default Fly;
