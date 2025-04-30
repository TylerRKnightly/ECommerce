import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting checkout data', form);
        dispatch(clearCart())
    };

    return (<>
        <h2 className="ms-2 mb-3">Checkout</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '525px' }}>
            <div className="form-row m-2">
                <input value={form.email} name="email" placeholder="Email" onChange={handleChange} type="email" className='form-control' />
            </div>
            <div className="form-row m-2 d-flex justify-content-between">
                <div className="form-group col me-2">
                    <input value={form.firstName} name="firstName" placeholder="First Name" onChange={handleChange} type="text" className='form-control' />
                </div>
                <div className="form-group col ms-2">
                    <input value={form.lastName} name="lastName" placeholder="Last Name" onChange={handleChange} type="text" className='form-control' />
                </div>
            </div>
            <div className="form-row m-2">
                <input value={form.address1} name="address1" placeholder="Address 1" onChange={handleChange} type="text" className='form-control' />
            </div>
            <div className="form-row m-2">
                <input value={form.address2} name="address2" placeholder="Address 2" onChange={handleChange} type="text" className='form-control' />
            </div>
            <div className="form-row m-2 d-flex justify-content-between">
                <div className="form-group col-6">
                    <input value={form.city} name="city" placeholder="City" onChange={handleChange} type="text" className='form-control' />
                </div>
                <div className="form-group col-2">
                    <input value={form.state} name="state" placeholder="State" onChange={handleChange} type="text" className='form-control' />
                </div>
                <div className="form-group col-3">
                    <input value={form.zip} name="zip" placeholder="Zip Code" onChange={handleChange} type="text" className='form-control' />
                </div>
            </div>
            <button type="submit" className="btn btn-secondary mt-3 ms-2">Place Order</button>
        </form>
    </>)
};

export default CheckoutForm;