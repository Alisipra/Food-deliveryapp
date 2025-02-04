import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  
  const fetchMyOrder = async () => {
    let userEmail = localStorage.getItem("email");

    try {
        let response = await axios.post(
            `${import.meta.env.VITE_REACT_BACKEND_BASEURL}/myorderdata`,
            { email: userEmail },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        

        if (response.data.data && response.data.data.myorderdata) {
            setOrderData(response.data.data.myorderdata.order_data || []);
        } else {
            console.error("Unexpected API response structure");
            setOrderData([]); // Handle missing data safely
        }
    } catch (error) {
        console.error("Error fetching order data:", error);
        setOrderData([]);
    }
};

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((item, index) => (
              <div key={index}>
                {item.Order_date ? (
                  <div className="m-auto mt-5">
                    <h4>{item.Order_date}</h4>
                    <hr />
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3 ">
                    <div className="card mt-3 bg-dark text-white" style={{ width: "16rem", maxHeight: "360px" }}>
                     
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="container w-100 p-0" style={{ height: "38px" }}>
                          <span className="m-1">Qty: {item.qty}</span>
                          <span className="m-1">Size: {item.size}</span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No orders found!</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
