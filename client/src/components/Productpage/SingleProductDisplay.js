import React,{useState} from 'react';
import "./spd.css";
import Modal from "../../components/Modal";
import axios from "axios";
import {url} from "../../url.js";


const SingleProductDisplay = (props) => {
    const [bid,setBid] = useState(props.product.currentprice+1);
    const [confirmed , setConfirmed] = useState(false);
    const [loading , setLoading] = useState(false);
    const [bloading , setbLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    async function handleBid() {
        setbLoading(true);
        if (bid <= props.product.currentprice) {
            alert("Bid price should be greater than the current price");
            setbLoading(false);
            return;
        }
    
        try {
            const bidder = user._id;
            const productid = props.product._id;
            const bidprice = bid;
            const response = await axios.post(`${url}/api/v1/bid/addbid`, {
                bidprice: bidprice,
                bidder: bidder,
                productid: productid
            });
            setbLoading(false);
            alert(response.data.message);
            console.log(response);
            window.location.reload();
        } catch (error) {
            setbLoading(false);
            console.log(error);
            alert("Bid not placed. Please try again.");
        }
    }
    

    const handleCartClicked = async () => {
        setLoading(true);
        await axios.put(`${url}/api/v1/product/addtocart`, {
          userid: user._id,
          productid: props.product._id,
        })
          .then(function (response) {
            setLoading(false);
            alert("Product added to cart");
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error)
            alert("Product already in cart")
          });
          setLoading(false);
      };

    return (
        <section className="py-5">
            <div className="container">
                <div className="row gx-5">
                    <aside className="col-lg-6">
                        <div className="border rounded-4 mb-3 d-flex justify-content-center">
                            <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href={props.product.productimage}>
                                <img className="rounded-4 fit" src={props.product.productimage} alt="Product Image" />
                            </a>
                        </div>
                    </aside>
                    <main className="col-lg-6">
                        <div className="ps-lg-3">
                            <h4 className="title text-dark">
                            NAME: <br />
                               {props.product.productname}
                                
                            </h4>
                            <div className="d-flex flex-row my-3">
                                {/* Star rating */}
                            </div>

                            <div className="mb-3">
                                <span className="h5">Current Price :₹{props.product.currentprice}</span>
                            </div>

                            <p>
                                {props.product.description}
                            </p>

                             <div className="row">
                                <div className="col-6">
                                    <dt>Sold By: {props.product.sellermail}</dt>
                                    <dt>Number of Bids : {props.product.bids.length }</dt>
                                </div>
                                
                            </div>
                            

                            <hr />
                            {props.product.status ? <><label htmlFor='bid'><h5>Enter the Bid amount :</h5> 
                            <input className="bidinp" type="number" name="bid" value={bid} onChange={(e)=>{setBid(e.target.value);setConfirmed(false)}}></input>
                            <button onClick={()=>{setConfirmed(!confirmed)}} className='buybtn'>{confirmed ? "Confirmed" : "confirm"}</button>
                            </label><br/>
                            <span>Confirm before bidding</span>
                            <br/>
                            {bloading ? <><div class="loader"></div></>:<button className="buybtn" disabled={!confirmed} onClick={handleBid}> Bid now </button>}
                            {loading ? <><div class="loader"></div></>:<><button className="buybtn" onClick={handleCartClicked}><i class="ri-shopping-cart-2-fill"></i>Add to cart </button></>}
                            </> : <h1>Auction Ended</h1>}
                            <hr />
                            {/* <div className="row">
                                <div className="col-6">
                                    <h1>BidBoard</h1>
                                    {props.product.bids.length > 0 ? props.product.bids.map((bid,index) => {
                                        return (
                                            <div key={index}>
                                                <dt>{bid} : ₹ {bid}</dt>
                                            </div>
                                        )
                                    
                                    }) : <dt>No Bids Yet</dt>}
                                </div>
                                
                            </div> */}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}

export default SingleProductDisplay;
