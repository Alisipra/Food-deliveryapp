import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [search,setSearch]=useState("");
  const [fooddata,setFoodData]=useState([]);
  const [category,setCategory]=useState([]);

  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);


  // const url="http://localhost:1000"
  useEffect(() => {
    console.log(import.meta.env.VITE_REACT_BACKEND_BASEURL);
    const fetchingData=async ()=>{
      const fetched=await axios.post(`${import.meta.env.VITE_REACT_BACKEND_BASEURL}/fetchData`,{headers:{
        "Content-Type":"application/json"
      }}
          )
    
          setFoodData(fetched.data[0])  
          setCategory(fetched.data[1])  
    }
    fetchingData()
  }, [])
 

// console.log(fooddata)


  return (
    <>
    <Navbar/>
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
    
    <div className="carousel-inner " style={{height:"130vh", }}>
    <div className='carousel-caption' style={{zIndex:"10" , marginBottom:"150px"}}>
    <div className="d-flex my-2 my-lg-0 ">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      {/* <button className="btn btn-success mx-2 my-2 my-sm-0 " type="submit">Search</button> */}
    </div>

    </div>
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1625944228741-cf30983ecb91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11dHRvbiUyMGthcmFoaXxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100 object-fit-contain " alt="" style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyfGVufDB8fDB8fHww" className="d-block w-100" style={{filter:"brightness(30%)"}} />
    </div>
    <div className="carousel-item">
      <img src="https://www.masala.tv/wp-content/uploads/2021/06/Beef-Shawarmaa.jpg" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    
  </div>
  
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> 
{/* kdafjklfdkajafjkdlfksj */}
    
      <div className='container'>
     {
      
      category.map((data)=>{
        return(
          
          <div key={data._id} className='row mb-4 container'>
            <div className='fw-bold fs-3'>
            {data.CategoryName}
            </div>
          
          <hr />
          {
          fooddata.filter((item)=>(item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()) )  ).map(filteredItem =>{
            return(
              <div key={filteredItem._id} className='col-12 col-md-6 col-lg-4 '>
                <Card data={filteredItem} option={filteredItem.options[0]}/>
              </div>
            )
          })
          }
          </div>
        )

      })
    } 
    </div>
     

     
    <Footer/>
    </>
  )
}
