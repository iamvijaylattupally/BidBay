import React,{useState , useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const SingleSellPage = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [buyer, setBuyer] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/product/getsellproduct/${id}`)
    .then((res) => {
      console.log(res.data);
      setProduct(res.data.product);
      setBuyer(res.data.buyer);
    })
    .catch((err) => {
      console.log(err);
      alert("error try again....")
    });
  }, []);
  async function handleSoldProduct(){
    setLoading(true);
    axios.post(`http://localhost:8000/api/v1/product/soldproduct`,{
      pid:id,
      bid:buyer._id,
      sid:product.sellerid
    }).then((res) => {  
      alert("Product Sold Successfully");
      setProduct(res.data.product);
      setBuyer(res.data.buyer);
      
    }).catch((err) => {
      console.log(err);
      alert("error try again....")
    })
    setLoading(false);
  }
  return (
    <>
        <Navbar />
        <section className="py-5">
            <div className="container">
                <div className="row gx-5">
                    <aside className="col-lg-6">
                        <div className="border rounded-4 mb-3 d-flex justify-content-center">
                            <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href={product?.productimage}>
                                <img className="rounded-4 fit" src={product?.productimage} alt="Product Image" />
                            </a>
                        </div>
                    </aside>
                    <main className="col-lg-6">
                        <div className="ps-lg-3">
                            <h4 className="title text-dark">
                            NAME: <br />
                               {product?.productname}
                                
                            </h4>
                            <div className="d-flex flex-row my-3">
                                {/* Star rating */}
                            </div>

                            <div className="mb-3">
                                <span className="h5">Current Price :₹{product?.currentprice}</span>
                            </div>


                             <div className="row">
                                <div className="col-6">
                                    <dt>Number of Bids : {product?.bids?.length}</dt>
                                </div>
                                
                            </div>
                            

                            <hr />
                            <div className="row">
                                <div className="col-6">
                                <h4>{product?.status ? "highestbidder" : "Sold To :"}</h4>
                                    <dt>Name : {buyer?.name}</dt>
                                    <dt>Email : {buyer?.email}</dt>
                                    <dt>Mobile No. : {buyer?.phonenumber}</dt>
                                    {product?.status ? "":<dt>Contanct the buyer and complete purchase</dt>}
                                    {product?.status &&
                                    <>
                                      <dt>Settle Bid and confirm buyer</dt>
                                      {loading ? <div class="loader"></div> : product?.highestbidder==null ? "" : <button className='small-btn' onClick={handleSoldProduct}>Settle</button>}
                                      </>
                                    }
                                </div>
                                
                            </div>
                            <hr />
                            
                        </div>
                    </main>
                </div>
            </div>
        </section>
    </>
  )
}

export default SingleSellPage