import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/freshcart-logo.svg";
import { AuthContext } from "../../Contexts/AuthContext";
import { CartContext } from "../../Contexts/CartContext";
export default function Navbar() {
  let { userLoggedIn, setUserLoggedIn } = useContext(AuthContext);
  let { cartNumber, setCartNumber } = useContext(CartContext);
  let navigate = useNavigate();

  function logout() {
    setUserLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container">
        <Link to={"home"} className="navbar-brand">
          <i className="fa-solid fa-cart-shopping nav-icon fa-2"></i>
          <span className="h3 bold">fresh cart</span>
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse align-items-center"
          id="collapsibleNavId"
        >
          {userLoggedIn ? (
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/cart"}>
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/orders"}>
                  All Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/categories"}>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"brands"}>
                  Brands
                </Link>
              </li>
            </ul>
          ) : null}

          <ul className=" d-flex list-unstyled mt-3">
            <li className="position-relative cart">
              <Link className="nav-link" to={"cart"}>
                <i className="fa-solid fa-cart-shopping fs-3 text-secondary"></i>
                <div className="badge position-absolute text-white bg-main">
                  {cartNumber}
                </div>
              </Link>
            </li>
            {!userLoggedIn ? (
              <>
                <li className="mx-2">
                  <Link className="nav-link" to={"register"}>
                    Register
                  </Link>
                </li>
                <li className="mx-2">
                  <Link className="nav-link" to={"login"}>
                    Login
                  </Link>{" "}
                </li>
              </>
            ) : (
              <li className="mx-2">
                <span onClick={logout} className="cursor-pointer nav-link ">
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
