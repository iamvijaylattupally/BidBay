import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import "./sellingpage.css";
import { useNavigate } from 'react-router-dom';

const SellingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="becomeseller">
        <div><h3>Become seller,List Your product to auction</h3></div>
        <div><button className='submit-btn'onClick={()=>{navigate("/addproduct")}} type='button'>List Product</button></div>
        <div><button className='linkbtn' type='button'>For detailed information regarding our auction,please click here.</button></div>
      </div>
    </>
  )
}

export default SellingPage