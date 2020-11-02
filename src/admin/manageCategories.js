import React, { useState, useEffect } from "react";
import BASE from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCategories, removeCategory } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data); // array so simply store the data
      }
    });
  };
  useEffect(() => {
    preLoad();
  }, []);

  const deleteCategory = (categoryId) => {
    removeCategory(categoryId, token, user._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // to reload the products we are calling the preload as react itselfs knows somethings have been changed
        preLoad();
      }
    });
  };
  return (
    <BASE title="Welcome Admin" description="Manage Categories Here">
      <h2 className="mb-4">Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            All the Categories here
          </h2>

          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className=" txt text-left" key={index}>
                    {category.name}
                  </h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                {/* in case we had to call the function without any parameter then we could have used the direct calling instead of calling through call back */}
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteCategory(category._id);
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
export default ManageCategories;
