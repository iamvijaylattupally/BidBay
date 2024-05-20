import React,{useEffect,useState} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import "./sellingpage.css";
import SellCard from './SellCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:8000/api/v1/product/getuserproducts', { userid: user._id })
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  return (
    <>
      <Navbar />
      <div className="becomeseller">
        <div><h3>Become seller,List Your product to auction</h3></div>
        <div><button className='submit-btn' onClick={() => { navigate("/addproduct") }} type='button'>List Product</button></div>
        <div><button className='linkbtn' type='button'>For detailed information regarding our auction,please click here.</button></div>
        <h3>Your Products</h3>
      </div>
      <div className='card-grid'>
        
        {products && products.map((product) => (
          <SellCard
            title={product.productname}
            currentprice={product.currentprice}
            imgurl={product.productimage}
            id={product._id}
            status={product.status}
          />
        ))

        }
      </div>
    </>
  )
}

export default SellingPage