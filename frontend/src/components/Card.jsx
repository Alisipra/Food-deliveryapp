import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let {name,img}=props.data;
  let options=props.option;
  let priceOptions=Object.keys(options);
   const [qty, setQty] = useState(1)
   const [size, setSize] = useState("")
   let dispatch=useDispatchCart()
    let cartsData=useCart()
    let finalPrice = qty * parseInt(options[size]); 
    const priceRef = useRef()


    useEffect(() => {
     setSize(priceRef.current.value)
    }, [])
    

  const handleCart= async()=>{
    try {
      let food = {}; // Initialize as an object
    
      for (const item of cartsData) {
        if (item.id === props.data._id) {
          food = item;
          break;
        }
      }
    
      if (Object.keys(food).length !== 0) { // Check if food exists
    
        if (food.size === size) {
          
          dispatch({ type: "UPDATE", id: props.data._id, price: finalPrice, qty: qty });
          return;
        } else {
          dispatch({
            type: "ADD",
            id: props.data._id,
            name: name,
            price: finalPrice,
            qty: qty,
            size: size
          });
          return;
        }
      }
    
      // If food was not found in cartData
      dispatch({
        type: "ADD",
        id: props.data._id,
        name: name,
        price: finalPrice,
        qty: qty,
        size: size
      });
    
      console.log(cartsData);
    } catch (error) {
      console.error("Some Error Occurred in dispatch:", error);
    }
    
    

  }
  return (
    <div>
        <div className="card m-4 bg-success text-white p-3" style={{height:"auto"}}>
  <img className="card-img-top" src={img} alt="cap image" style={{height:"120px"}}/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
      <div className='p-2 m-2'>
        <select className='m-2' onChange={(e)=>{setQty(e.target.value)}}>
            
        {Array.from(Array(6),(e,i)=>{
            return(
                <option key={i+1} value={i+1}>
                    {i+1}
                </option>
            )
                
        })}
        </select>
        <select onChange={(e)=>{setSize(e.target.value)}} ref={priceRef}>
            {
              priceOptions.map((data)=>{
                return(
                  <option key={data} value={data}>{data}</option>
                )
              })
            }
        </select>
        
        <div className='d-flex'>Price/-{finalPrice} Rs</div>
        
        <button className='btn btn-outline-light m-1 fw-bold' onClick={handleCart}>Add To Cart</button>
    </div>
    
  </div>
</div>
    </div>
  )
}
