import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "./navbar.scss";
import GlobalContext from "../../Context/GlobalContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userType, setUserType } =
    useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged Out 👋");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" data-aos="zoom-in-down" data-dos-delay="20">
      <div className="nav-container">
        <Link to="/" className="logo">
          Mini-Loans
        </Link>

        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
          </ul>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => {
                    setUserType(false);
                    setMenuOpen(false);
                  }}
                >
                  <button className="btn">Customer Login</button>
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    setUserType(true);
                    setMenuOpen(false);
                  }}
                >
                  <button className="btn">Admin Login</button>
                </Link>
              </>
            ) : (
              <>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
                <Link
                  to={userType ? "/admin/dashboard" : "/cust/dashboard"}
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="btn">Dashboard</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
