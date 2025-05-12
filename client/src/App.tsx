import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { loadUser } from './store/authSlice';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Home from './pages/Home';
import Products from './pages/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UserDashboard from './pages/Account';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded:DecodedToken = jwtDecode(token);
        if (decoded.id && decoded.exp && Date.now() / 1000 < decoded.exp) {
          dispatch(loadUser(decoded.id));
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container pb-5 pt-2">
        <div className='row mx-auto' style={{ maxWidth: '1200px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:categoryName' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/account' element={<UserDashboard />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


interface DecodedToken extends JwtPayload {
  id: string;
}