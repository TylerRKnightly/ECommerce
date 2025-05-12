import React from "react";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, clearAuthError } from '../store/authSlice';
import { RootState } from '../store/store';
import { useAppDispatch } from "../hooks/useAppDispatch";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromCart = location.state?.fromCart || location.pathname === '/cart';

  const auth = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({email, password}));
  };

  useEffect(() => {
    if (auth.user) {
      navigate(fromCart ? '/checkout' : '/');
    }
  }, [auth.user, fromCart, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const continueAsGuest = () => {
    navigate('/cart');
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className={`col-md-${fromCart ? '6' : '8'}`}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {auth.error && <div className="alert alert-danger">{auth.error}</div>}
            <button type="submit" className="btn btn-dark w-100">Login</button>
          </form>

          <div className="mt-4">Register <span className="ms-5">Forgot Password?</span></div>
        </div>

        {fromCart && (
          <div className="col-md-4 mt-5 mt-md-0">
            <h4>Continue as Guest</h4>
            <p>You can complete your order without creating an account.</p>
            <button className="btn btn-outline-secondary w-100" onClick={continueAsGuest}>
              Continue as Guest
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;