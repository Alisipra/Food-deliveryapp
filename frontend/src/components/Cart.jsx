import React from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import axios from "axios";

export default function Cart() {
    let cartData = useCart()
    let dispatch = useDispatchCart()
    if (cartData.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty...</div>
            </div>
        )
    }
    let totalPrice = cartData.reduce((total, food) => total + food.price, 0);
    // const handleCheckout = async () => {
    //     let userEmail = localStorage.getItem("email");
    //     console.log('Usr email is ',userEmail)
    //     let response = await axios.post(
    //         "http://localhost:1000/orderdata", 
    //         {
    //             order_data: cartData,  // Pass the cartData here
    //             email: userEmail,      // Ensure userEmail is defined
    //             order_date: new Date().toDateString()
    //         },
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     );
    
    //     if (response.status === 200) {
    //         dispatch({ type: "DROP" });
    //     }
    // };
    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("email");
        
      try {
            let response = await axios.post(
                "http://localhost:1000/orderdata", 
                {
                    order_data: cartData,  // Pass the cartData here
                    email: userEmail,      // Ensure userEmail is defined
                    order_date: new Date().toDateString()  // Current date in string format
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
    
            // Log the response status for debugging purposes
            console.log('Response Status:', response);
            
            if (response.status === 200) {
                dispatch({ type: "DROP" });  
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error("Error occurred during checkout:", error);
                
            if (error.response) {
                // Response errors from the backend (e.g., 400, 500)
                console.error('Error Response:', error.response);
                alert(`Server Error: ${error.response.data.message}`);
            }
            else if (error.request) {
                // No response from the server (network issues, server down, etc.)
                console.error('No response received:', error.request);
                alert("No response from server. Please try again later.");
            }
            else {
                // Other errors (e.g., request setup issues)
                console.error('Error Message:', error.message);
                alert(`Error: ${error.message}`);
            }



         }
    };
    
    return (

        <>
            <div className="container m-auto  table-responsive table-responsive-sm table-responsive-md"  >
                <table className="table table-hover" >
                    <thead className="text-success">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {
                            cartData.map((food, index) => {
                                return (<tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td className=""><button type="button" className="btn p-0 "><img className="" src="https://www.svgrepo.com/show/22981/trash-can.svg" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} style={{ width: "20px" }} /></button></td>
                                </tr>)

                            })
                        }
                    </tbody>
                </table>
                <div><h1>Total Price/{totalPrice} Rs</h1></div>
                <div><button className="bg-success fs-4 text-white rounded p-2" onClick={handleCheckout}>CheckOut</button></div>
            </div>
        </>
    );
}
