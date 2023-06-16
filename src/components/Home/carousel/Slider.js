// import { useEffect } from "react";
import SliderItem from "./SliderItem";
import classes from "./Slider.module.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { shoesActions } from "../../store/shoe-slice";
import { useEffect } from "react";
// import { fetchShoeData } from "../../store/shoe-actions";

const Slider = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(shoesActions.resetSingleData());
  }, [dispatch]);

  const shoes = useSelector((state) => state.shoes.items);


  const shoeList = shoes
    .map((shoe) => ({
      shoe,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ shoe }) => (
      <SliderItem
        key={shoe.key}
        id={shoe.id}
        name={shoe.name}
        type={shoe.type}
        colors={shoe.colors}
        price={shoe.price}
      />
    ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <section className={classes["slider-section"]}>
      <div className={classes.heading}>
        <h1>Sneak Peek</h1>
      </div>
      <Carousel
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={3000}
        transitionDuration={500}
        swipeable={false}
        draggable={false}
        responsive={responsive}
      >
        {shoeList}
      </Carousel>
    </section>
  );
};

export default Slider;
