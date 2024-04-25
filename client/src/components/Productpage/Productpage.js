import React,{useState} from 'react'
import "./pp.css";
import ProductCard from './ProductCard';
import ProductCardDelete from './ProductCardDelete';
import axios from 'axios';
import {url} from "../../url.js";
import "../load.css";

const Productpage = (props) => {

  const [loading, setLoading] = useState(false);
  const handleProductClicked = (title) => {
    console.log(title);
    alert(title);
  };
  const handleCartClicked = async (title) => {
    setLoading(true);
    await axios.post(`${url}/api/v1/product/addtocart`, {
      userid: props.user._id,
      productid: title
    })
      .then(function (response) {
        setLoading(false);
        alert("Product added to cart");
      })
      .catch(function (error) {
        setLoading(false);
        alert("Product already in cart")
      });
      setLoading(false);
  };
  const handleDeleteCartClicked = async (title) => {
    setLoading(true);
    await axios.post(`${url}/api/v1/product/deletecartproduct`, {
      pid: title,
      userid:props.user._id
    })
      .then(function (response) {
        setLoading(false);
        window.location.reload();
      })
      .catch(function (error) {
        setLoading(false);
        alert("try again")
      });
      setLoading(false);
      window.location.reload();
  }


  return (

    <>
      <section class="projects section" id="projects">
        <h2 class="section__title-1">
          <span>{props.pagetitle}</span>
        </h2>

        <div class="projects__container container grid">
          { loading ? <div className='loader-container'><div class="loader"></div></div>:

            props.cart === "0" ?
            props.products.map((product)=>(
              <ProductCard
                key={product._id}
                pid={product._id}
                pimg={product.productimage}
                sellername={product.sellermail}
                title={product.productname}
                currentprice={product.currentprice}
                productdescription={product.description}
                status={product.status}
                productClicked={handleProductClicked}
                addCartClicked={handleCartClicked}
              />
            )):props.products.map((product)=>(
              <ProductCardDelete
                key={product._id}
                pid={product._id}
                pimg={product.productimage}
                sellername={product.sellermail}
                title={product.productname}
                currentprice={product.currentprice}
                status={product.status}
                productdescription={product.description}
                productClicked={handleProductClicked}
                deleteCartClicked={handleDeleteCartClicked}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Productpage