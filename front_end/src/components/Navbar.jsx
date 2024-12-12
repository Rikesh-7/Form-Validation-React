import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          Employee Details
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Add Employee
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/view-employee" className="navbar-link">
              View Employee
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
