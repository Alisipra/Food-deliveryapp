import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {
    const url="http://localhost:1000";
    
    const  [name, setName] = useState("")
    const  [email, setEmail] = useState("")
    const  [password, setPassword] = useState("")
    const  [location, setLocation] = useState("")
    


    // automatic location getting
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude}, ${longitude}`);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Location access denied. Please enable it in your browser.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };
  
    const handleLocation = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${import.meta.env.VITE_REACT_BACKEND_BASEURL}/signup`,{ location });
        alert("Location saved successfully!");
      } catch (error) {
        console.error("Error saving location:", error);
      }
    };




    let navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response=await axios.post(`${url}/signup`,
            {name,email,password,location},
            {
                headers:{
                    "Content-Type":'application/json'
                }
            }
          )
          toast.success("Signup successful! Welcome!",{
            autoClose:2000
          }); 
          setTimeout(() => {
            navigate("/login")
          }, 3000);
        
       
         
        }
        

  return (

<div className="container d-flex justify-content-center align-items-center vh-100">
<div className="row w-100">
  <div className="col-12 col-md-6 col-lg-4 mx-auto">
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
      
      <h1 className="text-center fw-bold fst-italic text-dark">Sign Up</h1>

      <div className="form-group m-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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

      <div className="form-group m-2">
        <label htmlFor="location">Location</label>
        <div className='input-group'>
        <input
          type="text"
          className="form-control"
          id="location"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          
        />
        {<button className='btn btn-primary' onClick={getLocation}>get location</button>}
        </div>
      </div>

      <div className="text-center mt-3">
        <button type="submit" className="btn btn-success m-2 w-100" onSubmit={handleLocation}>
          Signup
        </button>
        <Link to="/login" className="btn btn-warning w-100 m-2">
          Already Have an Account? Log In
        </Link>
      </div>
    </form>
  </div>
</div>
<ToastContainer />
</div>
  )
}
