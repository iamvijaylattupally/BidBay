import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./ProtectedRoutes";
import Auth from './components/Auth/Auth';
import Home from './pages/Home/Home';
import Cart from "./pages/Cart/Cart";
import SellingPage from './pages/SellingPage';

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

        </Routes>

      </Router>
    </>
  );
}

export default App;
