import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:categoryName' element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
