import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";
import { url } from "../../url";
import Modal from '../../components/Modal';

const AddProduct = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  //modal
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  //form
  const [formData, setFormData] = useState({
    name: '',
    startprice: '',
    description: '',
    productimage: null // State to hold the selected file
  });
  const [loading ,setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    setLoading(true);
    try {
      if (!user) {
        console.error('User not found');
        return;
      }
      const { name, startprice, description, productImage } = formData;
      const sellerid = user._id; // Assuming you have the seller ID available
      const formDataObj = new FormData();
      formDataObj.append('name', name);
      formDataObj.append('startprice', startprice);
      formDataObj.append('description', description);
      formDataObj.append('productimage', productImage); // Append the file to FormData
      formDataObj.append('sellerid', sellerid);
      const response = await axios.post(`${url}/api/v1/product/addProduct`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
        }
      });
      console.log(response.data);
      setFormData({
        name: '',
        startprice: '',
        description: '',
        productImage: null
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>List Your Product</h1>
      <div className="signuppage">
        <div className="form">
          {loading ? <div class="loader"></div> :<><form onSubmit={handleSubmit}>
            <div>
              <input
                className="custom-input"
                type="text"
                placeholder='Enter the name of the product'
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="number"
                name="startprice"
                placeholder='Enter the base price of the product'
                className="custom-input"
                value={formData.startprice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder='Enter the description of the product'
                className="custom-input"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                placeholder='Add an image of the product'
                className="custom-input"
                name="productimage"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className='submit-btn'>Add Product</button>
            <Modal isOpen={open} onClose={handleClose}>
                <>
                <h2>Product added</h2>
                <button className='done-btn'>Done</button>
                
                </>
        </Modal>
          </form></>}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

{/* <button className='submit-btn' onClick={handleOpen}>Add Product</button>
        <Modal isOpen={open} onClose={handleClose}>
                <>
                <h2>Product added</h2>
                <button className='done-btn'>Done</button>
                
                </>
        </Modal> */}
