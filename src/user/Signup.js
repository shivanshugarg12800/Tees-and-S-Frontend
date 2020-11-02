import React, { useState } from "react";
import BASE from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, email, password, error, success } = values; // destructuring the values

  // this is basically the setting the individual values
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // on submit button
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    // now sending only the required values to the signup function in auth/helper/index
    signup({ name, lastname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          // if no error occurs then empty everything
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in Sign Up"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="row">
              <div className=" form-group col-md-6">
                <label className="txt">First Name</label>
                <input
                  className="form-control"
                  onChange={handleChange("name")}
                  type="text"
                  value={name}
                />
              </div>
              <div className=" form-group col-md-6">
                <label className="txt">Last Name</label>
                <input
                  className="form-control"
                  onChange={handleChange("lastname")}
                  type="text"
                  value={lastname}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="txt">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="txt">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>

            <button onClick={onSubmit} className="btn btn-block mybtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Sign Up Successfull..!!
            <br />
            <h5>
              Please{" "}
              <Link
                style={{
                  textDecoration: null,
                  fontWeight: 500,
                }}
                to="/signin"
              >
                Login here
              </Link>
            </h5>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BASE title="Sign up" description="New User!!...Sign Up here">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </BASE>
  );
};
export default Signup;
