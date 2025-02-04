import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../Modal";
import Cart from "./Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  };
  const [cartView,setCartView]=useState(false);
  let cartData=useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fst-italic p-3 fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand fs-4 fw-bold" href="#">
          BiteBuddy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active p-2 mt-2" to="/">
                Home
              </Link>
            </li>

            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link className="nav-link p-2 mt-2" to="/myorders">
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {!localStorage.getItem("token") ? (
              <div>
                <Link
                  className="btn btn-warning m-1 text-danger fw-bold"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-info text-danger fw-bold m-1"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div className="mx-2 bg-success p-2 rounded text-white" onClick={()=>setCartView(true)} style={{cursor:"pointer"}}>
                  My Cart
                  <Badge pill bg="danger" className="m-1">{cartData.length}</Badge>

                </div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/> </Modal> : null}
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
