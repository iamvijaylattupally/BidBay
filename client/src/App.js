import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./ProtectedRoutes";
import Auth from './components/Auth/Auth';
import Home from './pages/Home/Home';
import Cart from "./pages/Cart/Cart";
import SellingPage from './pages/SellingPage/SellingPage';
import AddProduct from './pages/AddProduct.js/AddProduct';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import UserBids from "./pages/UserBids/UserBids";
import SingleSellPage from './pages/SellingPage/SingleSellPage';
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/signup" element={<Auth />} />

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                  <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/sellerpage"
            element={
              <ProtectedRoutes>
                  <SellingPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoutes>
                  <AddProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/singleproduct/:title"
            element={
              <ProtectedRoutes>
                  <SingleProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/singlesellProduct/:id"
            element={
              <ProtectedRoutes>
                  <SingleSellPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/userbids"
            element={
              <ProtectedRoutes>
                  <UserBids />
              </ProtectedRoutes>
            }
          />

        </Routes>

      </Router>
    </>
  );
}

export default App;
