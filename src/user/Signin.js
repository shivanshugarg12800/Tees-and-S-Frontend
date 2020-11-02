import React, { useState } from "react";
import BASE from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
const Signin = () => {
  const [values, setValues] = useState({
    email: "user6@gmail.com",
    password: "user6@6",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
  };
  const LoadingMessage = () => {
    return (
      loading && (
        <div className="col-md-6 offset-sm-3 text-left alert alert-info">
          <h2>Loading..</h2>
        </div>
      )
    );
  };

  // this is to redirect the user to Udashboard and admin to the A.dashboard
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        setTimeout(LoadingMessage, 5000);
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
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

  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="txt">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="txt">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
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

  return (
    <BASE title="Welcome Back" description="Sign in here!!">
      {LoadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
    </BASE>
  );
};
export default Signin;
