import React, { useState, useEffect } from "react";
import BASE from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getOneCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preLoad = (categoryId) => {
    getOneCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setName(data.name); // array so simply store the data
      }
    });
  };
  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    //console.log("the value is ", event.target.value);

    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    updateCategory(user._id, match.params.categoryId, token, { name }).then(
      (data) => {
        console.log("the data is", data);

        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated!!</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          required
          autoFocus
          placeholder=" eg: Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <BASE
      title="Category"
      description="Update the Category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </BASE>
  );
};
export default UpdateCategory;
