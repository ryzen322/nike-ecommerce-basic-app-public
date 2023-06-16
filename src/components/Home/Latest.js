import classes from "./Latest.module.scss";

const Latest = () => {
  return (
    <section className={classes["latest-section"]}>
      <div className={classes.heading}>
        <h1>the latest</h1>
      </div>
      <div className={classes["image-container"]}></div>
    </section>
  );
};

export default Latest;
