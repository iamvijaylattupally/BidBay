import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import "../../components/load.css";
import PP from "../../components/Productpage/Productpage";
import axios from 'axios';
import {url} from "../../url.js";
const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cart,setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setLoading(true);
    axios.post(`${url}/api/v1/product/getcartproducts`, {
      userid:user._id
    })
    .then(function (response) {
      setLoading(false);
      console.log(response.data.products)
      setCart(response.data.products);
    })
    .catch(function (error) {
      console.log(error);
      alert("error in fetching cart products")
    });
    
  }  , [])
    
  return (
    <>
      <Navbar />
      {cart.length === 0 && loading ?<><div className='loader-container'><div class="loader"></div></div></>  :
        <PP 
          pagetitle="Cart Items"
          user={user}
          products={cart}
          cart="1"
        />
      }
      
      
    </>
  )
}

export default Cart