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
      console.log(error);
    });
  }  , [])
  
  
  return (
    <>
      <Navbar />
      {
        loading ? <div className='loader-container'><div class="loader"></div></div> :
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