import React from 'react';
import { categories } from '../../data/categories';
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import { ReactComponent as CartIcon } from '../../assets/cart-shopping-solid.svg'
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass-solid.svg'

const Navbar = () => {
    const getCategories = () => {
        return categories.map((c, idx) => (
            <button className="btn mx-2" key={idx} style={{ textDecorationLine: 'none' }}>
                {c}
            </button>
        ));
    }

    return (
        <div className="container-fluid m-0">
            {/* Upper */}
            <div className="row" style={{ backgroundColor: 'lightgray' }}>
                <div className='col m-1 d-flex justify-content-end' style={{ color: 'gray' }}>{`Need Help? >`}</div>
            </div>
            {/* Mid */}
            <div className="row align-items-center mx-auto" style={{ maxWidth: '1200px' }}>
                <div className="col d-flex justify-content-start">
                    <Logo />
                </div>
                <div className="col-5" style={{ maxWidth: '600px' }}>
                    <form className="d-flex">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: '10px 0 0 10px', outline: 'none', boxShadow: 'none' }} />
                        <button className="btn btn-outline-dark" type="submit" style={{ width: '50px', borderRadius: '0 10px 10px 0' }}><SearchIcon /></button>
                    </form>
                </div>
                <div className="col d-flex justify-content-end">
                    <div>
                        <button className='btn px-4'><UserIcon style={{ height: '25px' }} /></button>
                        <button className='btn'><CartIcon style={{ height: '25px' }} /></button>
                    </div>
                </div>
            </div>
            <hr className="m-0" />
            {/* Lower */}
            <div className="row">
                <div className="col d-flex justify-content-center">
                    {getCategories()}
                </div>
            </div>
            <hr className="m-0" />
        </div>
    );
}

export default Navbar;