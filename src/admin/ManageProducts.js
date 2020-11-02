import React, { useState, useEffect } from "react";

import BASE from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data); // array so simply store the data
      }
    });
  };
  useEffect(() => {
    preLoad();
  }, []);

  const removeProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // to reload the products we are calling the preload as react itselfs knows somethings have been changed
        preLoad();
      }
    });
  };

  return (
    <BASE title="Welcome Admin" description="Manage Products Here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center txtcard font-weight-400 my-5">
            All your Products
          </h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="txt text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                {/* in case we had to call the function without any parameter then we could have used the direct calling instead of calling through call back */}
                <div className="col-4">
                  <button
                    onClick={() => {
                      removeProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BASE>
  );
};
export default ManageProducts;
