import React from 'react';
import "./navbar.css";
import { RiAuctionFill } from "react-icons/ri";
import { FaShoppingCart,FaHome  } from "react-icons/fa";
import { BiSolidLogOut } from "react-icons/bi";
import { MdSell } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  function handleLogout(){
    localStorage.removeItem("user");
    removeCookie('accessToken');
    window.location.reload();
  }
  return (
    <div className="navbars">
      <header>
        <div className="logo">
          <span className="material-symbols-outlined"><RiAuctionFill />BidBay</span>
        </div>
        <input type="checkbox" id="nav_check" hidden />
        <nav>
          <ul>
            <li>
              <NavLink to="/" ><vij className="active"><FaHome /><span className='space'>home</span></vij></NavLink>
            </li>
            <li>
            <NavLink to="/cart"><vij className="active"><FaShoppingCart /><span className='space'>cart</span></vij></NavLink>
            </li>
            <li>
             <NavLink to="/sellerpage"><vij className="active"><MdSell /><span className='space'>My Products</span></vij></NavLink>
            </li>
            <li>
            <button class="custom-button" onClick={handleLogout}><vij className="active"><BiSolidLogOut /><span className='space'>logout</span></vij></button>
            </li>
          </ul>
        </nav>
        <label htmlFor="nav_check" className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </label>
      </header>
    </div>
  )
}

export default Navbar;
