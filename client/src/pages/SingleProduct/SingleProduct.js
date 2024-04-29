import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import {url} from "../../url.js";
import "../../components/load.css";
import SingleProductDisplay from '../../components/Productpage/SingleProductDisplay.js';

const SingleProduct = () => {
    const { title } = useParams();
    const [product, setProduct] = useState({});
    const [loading,setLoading] = useState(false);
    const handleClick = async() => {
        setLoading(true);
        await axios.get(`${url}/api/v1/product/getsingleproduct/${title}`)
            .then(res => {
                setLoading(false);
                console.log(res.data)
                setProduct(res.data.product);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
                alert("Product not found");
            })
            setLoading(false);
    }
    useEffect(() => {
        handleClick();
    }, [])
    return (
        <>
            <Navbar />
            {loading ? (
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            ) : (
                product && Object.keys(product).length > 0 && (
                    <SingleProductDisplay
                        product={product}
                    />
                )
            )}
        </>
    )
}

export default SingleProduct