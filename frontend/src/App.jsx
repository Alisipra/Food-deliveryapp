import React from 'react'
import Home from './screens/Home'
import "./App.css"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { CartProvider } from './components/ContextReducer'
import Cart from './components/Cart'
import MyOrder from './screens/MyOrder'
const App = () => {
  return (
    <>
    <CartProvider >
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
{/*         <Route path='/login' element={<Login/>}/> */}
{/*         <Route path='/signup' element={<Signup/>}/> */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/myorders' element={<MyOrder/>}/>
      </Routes>
    </Router>
    </CartProvider>
    
    </>
  )
}

export default App
