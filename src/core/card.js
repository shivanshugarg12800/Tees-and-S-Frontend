import React, { useState } from "react";
import ImageHelper from "./helper/Imagehelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/Carthelper";

const Card = ({
  product,
  addtoCart = true,
  removefromcart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  // these are the default values as in case nothing is passed from the database
  const cartTitle = product ? product.name : "photo from pexels";
  const cartdescription = product
    ? product.description
    : "this photo looks great";
  const cartPrice = product ? product.price : "Rs:10";

  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemovefromCart = (removefromcart) => {
    return (
      removefromcart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card shadow" style={{ minHeight: "600px" }}>
      <ImageHelper product={product} />
      <div className="card-body">
        {getRedirect(redirect)}
        <p className="lead txt font-weight-bold text-left m-2">{cartTitle}</p>
        <p className="lead   txtcard text-left text-muted  m-2">
          {cartdescription}
        </p>
        <p className="font-weight-500 txtcard px-2 text-left m-2">
          <i className="fa fa-rupee"></i> {cartPrice}
        </p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">{showRemovefromCart(removefromcart)}</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
