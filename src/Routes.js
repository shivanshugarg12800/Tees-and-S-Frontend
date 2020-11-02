import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import Profile from "./user/Profile";
import AddCategory from "./admin/AddCategory";
import manageCategories from "./admin/manageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import Updateproduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />

        {/* these are the admin routes ie all the routes managed by the Admin */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={manageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={Updateproduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
      </Switch>
    </Router>
  );
};
export default Routes;
