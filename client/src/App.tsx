import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UserDashboard from './pages/User';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:categoryName' element={<Products />} />
        <Route path='/cart' element={<Cart/> }/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/checkout' element={<Checkout/> }/>
        <Route path='/account' element={<UserDashboard/> }/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
