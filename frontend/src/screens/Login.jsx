import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const url = "http://localhost:1000";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_BASEURL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("email",email);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful! Welcome!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Invalid Email or Password...", {
        autoClose: 2000, // Set the auto-close time to 2 seconds
      });
    }
  };
  return (
    <>
      {/* <div className='d-flex container justify-content-center mt-5'>
    <form onSubmit={handleSubmit}>
    <h1 className='text-center fw-bold fst-italic'>Log In</h1>
  <div className="form-group m-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" style={{width:"450px"}} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
  
  </div>
  <div className="form-group m-2">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary m-2 bg-success">
   Login
    </button>
  <button type="submit" className="btn btn-primary m-2 bg-danger">
    <Link to="/signup" className='text-decoration-none text-white' >New User</Link>
    </button>
  </div>
</form>
<ToastContainer />
</div>     */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
          <div className="col-12 col-md-6 col-lg-4 mx-auto">
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow bg-light"
            >
              <h1 className="text-center fst-italic text-dark">Login</h1>
              

              <div className="form-group m-2">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group m-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success m-2 w-100">
                  Login
                </button>
                <Link to="/signup" className="btn btn-danger w-100 m-2">
                  New User? Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
