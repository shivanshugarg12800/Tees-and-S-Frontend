import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import BASE from "./Base";
import Card from "./card";
import { loadCart } from "./helper/Carthelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for CheckOut</h2>
      </div>
    );
  };

  const totalAmount = () => {
    let amount = 0;
    products.map((product, index) => {
      amount += product.price;
    });
    return amount;
  };

  return (
    <BASE title="Cart" description="Check your Cart and CheckOut!!">
      {/*whatever goes in here comes under the children in the base.js */}
      <div className="row text-center">
        <div className="col-6">
          <h2>Your Cart</h2>

          <div className="row">
            {products.map((product, index) => (
              <div className="col-6 mb-3 card-deck">
                <Card
                  key={index}
                  product={product}
                  addtoCart={false}
                  removefromcart={true}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-6">
          <h3 className="mb-5">Payment</h3>
          {products.map((product, index) => {
            return (
              <div className="row justify-content-center">
                <div className="col-4 bg-white txt font-weight-bold shadow">
                  <h3>{product.name}</h3>
                </div>
                <label className="col-3 mb-0 bg-white shadow text-center pt-2">
                  <i className="fa fa-rupee"></i> {product.price}
                </label>
              </div>
            );
          })}
          <h3 className="txt">
            Checkout amount :{" "}
            <span className="badge badge-pill badge-secondary">
              <i className="fa fa-rupee"></i> {totalAmount()}
            </span>
          </h3>
        </div>
      </div>
    </BASE>
  );
};
export default Cart;
