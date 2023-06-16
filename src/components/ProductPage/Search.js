import classes from "./Search.module.scss";

const Search = (props) => {
  return (
    <section className={classes["search-section"]}>
      <input
        className={classes.search}
        type="search"
        placeholder="Search"
        onChange={(e) => props.search(e.target.value)}
      />
    </section>
  );
};

export default Search;
