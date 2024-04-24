import React, { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useCookies, Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [userData, setUserData] = useState({
    email: '',
    phonenumber: "",
    password: '',
    cpassword: '',
    name: ''
  });

  const [registered, setRegistered] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  function validateData() {
    if (userData.email === "" || userData.password === "" || (userData.cpassword === "" && !registered) || (userData.phonenumber === "" && !registered) || (userData.name === "" && !registered)) {
      alert("Please fill all the fields")
      setUserData({
        email: '',
        phonenumber: "",
        password: '',
        cpassword: '',
        name: ''
      })
      return false;
    }
    if (!registered) {
      if (userData.password !== userData.cpassword) {
        alert("Password and Confirm Password should be same")
        setUserData({
          email: '',
          phonenumber: "",
          password: '',
          cpassword: '',
          name: ''
        })
        return false;
      }
    }
    return true;
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const validate = validateData();
    if (validate) {
      setIsLoading(true);
      console.log("Data is validated");
      const lors = registered ? 'login' : 'register';
      await axios.post(`/api/v1/user/${lors}`, userData)
      .then(function (response) {
        console.log(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setCookie("accessToken", response.data.accessToken, { path: "/" });
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setUserData({
          email: '',
          phonenumber: "",
          password: '',
          cpassword: '',
          name: ''
        })
        setIsLoading(false);
        alert(error.response.data.message);
      });
      setUserData({
        email: '',
        phonenumber: "",
        password: '',
        cpassword: '',
        name: ''
      })
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <>
      <header className="typewriter">
        <div className="type">
          <h2>
            Welcome to BidBay
            <span>___Bid</span>
            <span>___Buy</span>
            <span>__Sell</span>
          </h2>
        </div>
      </header>
      <main>
        <div className="signuppage">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <h1 className="formhead">{!registered ? "SIGN-UP FORM" : "LOGIN FORM"}</h1>
              <div>
                <input
                  className="custom-input"
                  maxLength={20}
                  required
                  type="email"
                  placeholder="Enter the Email"
                  value={userData.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              {!registered && <div>
                <input
                  className="custom-input"
                  required
                  maxLength={10}
                  type="text"
                  placeholder="Enter the mobile Number"
                  value={userData.phonenumber}
                  name="phonenumber"
                  onChange={handleChange}
                />
              </div>
              }
              <div>
                <input
                  className="custom-input"
                  required
                  maxLength={20}
                  type="password"
                  placeholder="Enter the Password"
                  value={userData.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              {!registered && <div>
                <input
                  className="custom-input"
                  required
                  maxLength={20}
                  type="cpassword"
                  placeholder="Confirm the Password"
                  value={userData.cpassword}
                  name="cpassword"
                  onChange={handleChange}
                />
              </div>
              }
              {!registered && <div>
                <input
                  className="custom-input"
                  required
                  maxLength={15}
                  type="text"
                  placeholder="Enter the name"
                  value={userData.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              }
              {!registered &&
                <div><button className='linkbtn'>Forgot password?</button></div>
              }
              <div>
                <button className='linkbtn' type='button' onClick={() => { setRegistered(!registered) }}>{registered ? "New User? Sign-Up" : "Already a User? Login"}</button>
              </div>
              {!registered && <div><span>By clicking signing-up,You agree to all terms and conditions.</span></div>}
              <div className='sb'>
                <button className='submit-btn' disabled={isLoading} type="submit">{!registered ? "SIGN-UP" : "LOGIN"}</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
