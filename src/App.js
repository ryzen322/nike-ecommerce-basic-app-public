import React, { Suspense } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import ProductPage from "./pages/ProductPage";
import Products from "./components/ProductPage/Products";

// data fetching
import { fetchShoeData } from "./components/store/shoe-actions";
import { fetchCartData, sendCartData } from "./components/store/cart-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { shoesActions } from "./components/store/shoe-slice";
import { sendOrderData } from "./components/store/checkout-actions";

const ProductDetail = React.lazy(() =>
  import("./components/ProductPage/ProductDetail")
);
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const Checkout = React.lazy(() => import("./components/Checkout/Checkout"));
const Bag = React.lazy(() => import("./components/Checkout/Bag"));
const Deliver = React.lazy(() => import("./components/Checkout/Deliver"));
const Pickup = React.lazy(() => import("./components/Checkout/Pickup"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();

  const orders = useSelector((state) => state.checkout);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // shoes data fetching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShoeData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(shoesActions.resetSingleData());
  }, [dispatch]);

  // cart data
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      // dispatching this action creator that returns functions will work here becuase that is how redux toolkit works
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  // order data
  useEffect(() => {
    dispatch(sendOrderData(orders));
  }, [orders, dispatch]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/product-page"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                {<ProductPage />}
              </Suspense>
            }
          />

          <Route
            path="/product-page/:productType"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Products />
              </Suspense>
            }
          />

          <Route
            path="/product-page/:productType/:productId/:colorId"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProductDetail />
              </Suspense>
            }
          />

          <Route
            path="/bag"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Bag />
              </Suspense>
            }
          />

          <Route
            path="/checkout"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Checkout />
              </Suspense>
            }
          >
            <Route
              path={`deliver`}
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Deliver />
                </Suspense>
              }
            />
            <Route
              path={`pickup`}
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Pickup />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
