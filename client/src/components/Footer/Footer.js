import React from 'react'
import "./footer.css";

const Footer = () => {
  return (
    <>
        <footer class="footer">
        <div class="footer-container">
            <div class="footer-section about">
                <h3>About Us</h3>
                <p>We are a company dedicated to providing the best services in buying used/sell items for our customers.</p>
            </div>
            <div class="footer-section contact">
                <h3>Contact Us</h3>
                <ul>
                    <li>Email: vijayreddylattupally@gmail.com</li>
                    <li>Phone: +91 9951124458</li>
                    <li>Address: 500001 Hyderabad,Telangana</li>
                </ul>
            </div>
           
        </div>
        <div class="footer-bottom">
            &copy; 2024 Kalam Solutions pvt ltd | Designed by L.vijayreddy
        </div>
    </footer>
    </>
  )
}

export default Footer