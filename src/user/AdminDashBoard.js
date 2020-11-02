import React from "react";
import BASE from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftside = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-warning" style={{ color: "#540b0e" }}>
          Admin Navigation
        </h4>
        <ul className="list-group">
          <li className="list-group-item li">
            <Link to="/admin/create/category" className="nav-link li-text">
              Create Category
            </Link>
          </li>
          <li className="list-group-item li">
            <Link to="/admin/categories" className="nav-link li-text">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item li">
            <Link to="/admin/create/product" className="nav-link li-text">
              Create Product
            </Link>
          </li>
          <li className="list-group-item li">
            <Link to="/admin/products" className="nav-link li-text">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item li">
            <Link to="/admin/orders" className="nav-link li-text">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightside = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header li" style={{ color: "#540b0e" }}>
          Admin Information
        </h4>
        <ul className="list-group">
          <li className="list-group-item  li">
            <span className="badge badge-warning mr-2">Name:</span>
            <span style={{ color: "#540b0e" }}>{name}</span>
          </li>
          <li className="list-group-item li">
            <span className="badge badge-warning mr-2">Email:</span>{" "}
            <span style={{ color: "#540b0e" }}>{email}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <BASE
      title="Welcome to the Admin Panel"
      description="Manage all the Admin tasks here"
    >
      <div
        className="container p-4"
        style={{
          backgroundColor: "#9e2a2b",
          borderRadius: "2%",
        }}
      >
        <div className="row">
          <div className="col-3">{adminLeftside()}</div>
          <div className="col-9">{adminRightside()}</div>
        </div>
      </div>
    </BASE>
  );
};
export default AdminDashboard;
