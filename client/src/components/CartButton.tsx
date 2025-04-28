import React, { useRef } from "react";
import { ReactComponent as CartIcon } from '../assets/cart-shopping-solid.svg'
import { ReactComponent as DeleteIcon } from '../assets/trash-can-regular.svg'
import { Offcanvas } from 'bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const CartButton = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const cartRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();


    const openCart = () => {
        if (cartRef.current) {
            const cartSidebar = new Offcanvas(cartRef.current);
            cartSidebar.show();
        }
    };

    const closeCart = () => {
        if (cartRef.current) {
            const cartSidebar = Offcanvas.getInstance(cartRef.current);
            cartSidebar?.hide();
        }
    };

    return (<>
        <button className='btn' onClick={openCart}><CartIcon style={{ height: '25px' }} /></button>

        <div ref={cartRef} className='offcanvas offcanvas-end' tabIndex={-1} aria-labelledby='cartSidebarLabel'>
            <div className="offcanvas-header">
                <h5>Your Cart {cartItems.length > 0 && `(${cartItems.reduce((prev, curr) => prev + curr.quantity, 0)} Items)`}</h5>
                <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr />
            <div className="offcanvas-body">
                {cartItems.length === 0 ? (<p>Your cart is empty</p>) : (
                    <>
                        <ul className="list-group">{
                            cartItems.map(i => (
                                <li className="list-group-item" key={i._id}>
                                    <div className="d-flex justify-content-between">
                                        {i.name}
                                        <span className="text-muted">{formatCurrency(i.price, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <button
                                                className='btn btn-sm'
                                                onClick={(e) => {
                                                    setTimeout(() => {
                                                        (e.target as HTMLButtonElement).blur();
                                                    }, 0);
                                                    dispatch(updateQuantity({ id: i._id, quantity: i.quantity - 1 }));
                                                }}
                                                disabled={i.quantity <= 1}
                                            >-</button>
                                            <span className="mx-1"><small>{i.quantity}</small></span>
                                            <button
                                                className='btn btn-sm'
                                                onClick={() => dispatch(updateQuantity({ id: i._id, quantity: i.quantity + 1 }))}
                                            >+</button>
                                        </div>
                                        <div>
                                            <button
                                                className="btn"
                                                onClick={() => dispatch(removeFromCart(i._id))}
                                            ><DeleteIcon style={{ color: 'crimson', width: '1rem' }} /></button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }</ul>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            Subtotal:
                            <span>{formatCurrency(cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0), true)}</span>
                        </div>
                        <div className="mt-3">
                            <Link to="/" className="btn w-100" onClick={closeCart}>Checkout</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>);
}

export default CartButton;