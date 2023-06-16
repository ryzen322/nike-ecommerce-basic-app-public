import React, { useEffect } from "react";
import { fetchSingleShoeData } from "../store/shoe-actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ProductDetail.module.scss";
import Colors from "./color/Colors";
import ColorForm from "./color/ColorForm";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { productId } = params;
  const shoeSingleData = useSelector((state) => state.shoes.singleData);

  useEffect(() => {
    dispatch(fetchSingleShoeData(productId));
  }, [productId, dispatch]);

  return (
    <section className={classes["productDetail-section"]}>
      <Colors />
      <div className={classes["details-section"]}>
        <div className={classes.detail}>
          <h3>{shoeSingleData && shoeSingleData.name}</h3>
          <p>{shoeSingleData && shoeSingleData.type}</p>
          <p>
            &#8369;
            {shoeSingleData &&
              shoeSingleData?.price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
          </p>
        </div>
        <ColorForm />
        <div className={classes.description}>
          <p>
            The Air Max Pulse pulls inspiration from the London music scene,
            bringing an underground touch to the iconic Air Max line. Its
            textile-wrapped midsole and vacuum-sealed accents keep 'em looking
            fresh and clean, while colours inspired by the London music scene
            give your look the edge. Point-loaded Air cushioning—revamped from
            the incredibly plush Air Max 270—delivers better bounce, helping you
            push past your limits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
