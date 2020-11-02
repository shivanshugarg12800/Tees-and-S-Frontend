import React, { useState } from "react";
import BASE from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    if (event.target.value != "") {
      setName(event.target.value);
    } else {
      errorMessage();
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created!!</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead txt font-weight-bold">Enter the Category</p>
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
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <BASE title="Category" description="Create the category for new Product">
      <div
        className="container p-4 mb-4 rounded"
        style={{ backgroundColor: "#aed9e0" }}
      >
        <div className="row bg-white rounded">
          <div className="col-4">{goBack()}</div>
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {myCategoryForm()}
          </div>
        </div>
      </div>
    </BASE>
  );
};
export default AddCategory;
