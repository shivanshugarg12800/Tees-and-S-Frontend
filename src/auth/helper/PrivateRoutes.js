import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from ".";

// passing the component and the rest properties as rest
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route // returning a Route which contains the properties
      {...rest}
      render={(
        props // rendering the component in the route after the checking
      ) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect // otherwise redirecting the user back to the login page
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
