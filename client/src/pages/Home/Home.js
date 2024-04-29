import React,{useState , useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import "../../components/load.css";
import "./home.css";
import PP from "../../components/Productpage/Productpage";
import axios from "axios";
import {url} from "../../url.js";

const Home = () => {
  const [products,setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setLoading(true);
    axios.post(`${url}/api/v1/product/getproducts`, {
      userid:user._id
    })
    .then(function (response) {
      setLoading(false);
      setProducts(response.data.products);
      console.log(response.data.products);
      console.log(products);
    })
    .catch(function (error) {
      setLoading(false);
      console.log(error);
    });
    setLoading(false);
  }  , [])
  
  
  return (
    <>
      <Navbar />
      {
        loading ? <div className='loader-container'><div class="loader"></div></div> :
        products.length === 0 ? <h1>No products to display</h1> :
          <PP 
            pagetitle="Browse Products"
            user={user}
            products={products}
            cart="0"
          />  
      }
    </>
  )
}

export default Home