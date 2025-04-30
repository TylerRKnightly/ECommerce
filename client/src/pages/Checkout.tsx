import React from "react";
import CheckoutForm from "../components/checkoutForm/CheckoutForm";

const Checkout = () => {
    return (<>
        <div className='row mx-auto' style={{ maxWidth: '1200px' }}>
            <div className="mx-5 mt-5">
            <CheckoutForm />
            </div>
        </div>
    </>);
};

export default Checkout;