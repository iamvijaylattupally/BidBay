import React from 'react'
import SingleSellPage from './SingleSellPage';
import { useNavigate } from 'react-router-dom';
const SellCard = (props) => {
    const navigate = useNavigate();
    const cardStyle = {
        width: '18rem'
    };
    const handleSettleBid = () => {
        navigate(`/singlesellproduct/${props.id}`)
    }
    return (
        <>
            <div className="card" style={cardStyle}>
                <img src={props.imgurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h5>current Price :₹{props.currentprice}</h5>
                    <button type="button" onClick={handleSettleBid} className='small-btn'>{props.status ? "Settle Bid" : "Sold"}</button>
                </div>
            </div>
        </>
    )
}

export default SellCard