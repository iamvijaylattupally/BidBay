import React,{useState,useEffect} from 'react'
import NavBar from "../../components/Navbar/Navbar";
import {url} from "../../url";
import axios from 'axios';
import ProductCard from '../../components/Productpage/ProductCard';
import { useNavigate } from 'react-router-dom';

const UserBids = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading,setLoading] = useState(false);
  const [products,setproducts] = useState([]);
  const handleProductClicked = (title) => {
    navigate(`/SingleProduct/${title}`);
  };
  async function getBids(){
    setLoading(true);
    await axios.post(`${url}/api/v1/bid/getbids`,{
      userid:user._id
    }).then(res=>{
      setLoading(false);
      console.log(res.data);
      setproducts(res.data.products);
    }).catch(err=>{
      setLoading(false);
      console.log(err);
    })
    setLoading(false);
  }
  useEffect(() => {
    getBids();
  }, [])
  return (
    <>
      <NavBar />
      <section class="projects section" id="projects">
        <h2 class="section__title-1">
          <span>Your Bids</span>
        </h2>

        <div class="projects__container container grid">
          {loading ?<div className='loader-container'><div class="loader"></div></div> : 
            products===null ? <h1>No Bids</h1> :
            products.map((product)=>(
              <ProductCard
                key={product._id}
                pid={product._id}
                bidded={true}
                userbidprice={product.userbidprice}
                pimg={product.productimage}
                sellername={product.sellermail}
                title={product.productname}
                currentprice={product.currentprice}
                productdescription={product.description}
                productClicked={handleProductClicked}
                status={product.status}
              />
            ))
          }
        </div>
      </section>
    </>
    
  )
}

export default UserBids