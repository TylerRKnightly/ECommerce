import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from "../utils/format";
import placeholderImg from '../assets/product-placeholder80.svg'

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const token = localStorage.getItem('token');
    const isLoggedIn = !!auth.user || !!token;

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;

    if (cartItems.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h3>Your cart is empty</h3>
                <Link to="/" className="btn btn-outline-secondary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    const handleProceedToCheckout = () => {
        if (isLoggedIn) {
            navigate('/checkout');
        } else {
            navigate('/login', { state: { fromCart: true } });
        }
    };

    return (
        <>
            <h2 className="mb-4">Your Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    {cartItems.map(item => (
                        <div key={item._id} className="card mb-3 p-3 d-flex flex-row align-items-center">
                            <img src={placeholderImg} alt={item.name} style={{ width: '80px', height: 'auto' }} className="mx-4" />
                            <div className="flex-grow-1">
                                <h5>{item.name}</h5>
                                <p className="mb-1">{formatCurrency(item.price, true)}</p>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-sm me-2"
                                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button className="btn btn-sm ms-2"
                                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                                    >+</button>
                                </div>
                                <button className="btn btn-sm text-danger mt-2 p-0"
                                    onClick={() => dispatch(removeFromCart(item._id))}
                                >Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-lg-4">
                    <div className="card p-4">
                        <h5>Order Summary</h5>
                        <p className="mb-1">Subtotal: {formatCurrency(subtotal, true)}</p>
                        <p className="mb-1">Estimated Shipping & Handling: -</p>
                        <p className="mb-3">Estimated Tax: {formatCurrency(tax, true)}</p>
                        <p className="">Total: <strong>{formatCurrency(subtotal + tax, true)}</strong></p>
                        <button className="btn btn-dark w-100 mt-3" onClick={handleProceedToCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;