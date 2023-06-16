import ProductItem from "./ProductItem";
import FilterData from "./FilterData";
import { useParams, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import classes from "./Products.module.scss";
import Cart from "./cart/Cart";
import Search from "./Search";
import { useEffect } from "react";
import { shoesActions } from "../store/shoe-slice";

const Product = () => {
  // filter using query params
  const [searchParams, setSearchParams] = useSearchParams();

  const searchitem = searchParams.get("shoes") || "";

  const params = useParams();
  const { productType } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(shoesActions.resetSingleData());
  }, [dispatch]);

  const shoes = useSelector((state) => state.shoes.items);

  const filteredShoes = shoes.filter((shoe) => shoe.type === productType);

  let shoesData = shoes;

  if (productType !== undefined) {
    shoesData = filteredShoes;
  }

  const handleSearch = (searchValue) => {
    const shoes = searchValue;
    if (shoes) {
      setSearchParams({ shoes });
    } else {
      setSearchParams({});
    }
  };

  // mapping through products and putting into per component item.
  const productsList = shoesData
    .filter((shoe) => {
      // console.log(shoe);
      return searchitem.toLowerCase() === ""
        ? shoe
        : shoe.name.toLowerCase().includes(searchitem);
    })
    .map((shoe) => (
      <ProductItem
        key={shoe.key}
        id={shoe.key}
        name={shoe.name}
        type={shoe.type}
        colors={shoe.colors}
        price={shoe.price}
      />
    ));
  // .map((shoe) => ({
  //   shoe,
  //   sort: Math.random(),
  // }))
  // .sort((a, b) => a.sort - b.sort);

  return (
    <>
      <section className={classes["products-section"]}>
        <div className={classes.actions}>
          <div className={classes.section1}>
            <FilterData />
          </div>
          <div className={classes.section2}>
            <Search search={handleSearch} />
            <Cart />
          </div>
        </div>
        <ul className={classes.products}>{productsList}</ul>
      </section>
    </>
  );
};

export default Product;
