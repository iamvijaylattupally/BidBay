import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import "../../components/load.css";
import PP from "../../components/Productpage/Productpage";
import axios from 'axios';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cart,setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setLoading(true);
    axios.post('/api/v1/product/getcartproducts', {
      userid:user._id
    })
    .then(function (response) {
      console.log(response.data.products)
      setCart(response.data.products);
    })
    .catch(function (error) {
      console.log(error);
      alert("error in fetching cart products")
    });
    setLoading(false);
  }  , [])
    
  return (
    <>
      <Navbar />
      {cart.length === 0 ? <h1>Cart is empty</h1> :
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