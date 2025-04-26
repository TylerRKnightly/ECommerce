import React, { useRef } from "react";
import { ReactComponent as CartIcon } from '../assets/cart-shopping-solid.svg'
import { Offcanvas } from 'bootstrap';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

const CartButton = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const cartRef = useRef<HTMLDivElement>(null);


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
                <h5>Your Cart {cartItems && `(${cartItems.length} Items)`}</h5>
                <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr />
            <div className="offcanvas-body">
                {cartItems.length === 0 ? (<p>Your cart is empty</p>) : (
                    <>
                        <ul>{
                            cartItems.map(i => (
                                <li className="list-group-item" key={i._id}>
                                    {i.name}
                                    <div className="d-flex justify-content-between text-muted">
                                        x{i.quantity}
                                        <span>{formatCurrency(i.price, true)}</span>
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
                            <Link to="/" className="btn w-100" onClick={closeCart}
                            >Checkout</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>);
}

export default CartButton;