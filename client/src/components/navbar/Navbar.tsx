import React from 'react';
import { categories } from '../../data/categories';
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass-solid.svg'
import { Link } from 'react-router-dom';
import './Navbar.css'
import CartButton from '../cartButton/CartButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Navbar = () => {
    const getCategories = () => {
        return categories.map((c, idx) => {
            const path = c.toLowerCase().replace(/\s+/g, '-');
            return (
                <Link to={`/products/${path}`} className="btn mx-2 nav-underline-hover" key={idx}>
                    {c}
                </Link>
            )
        });
    }

    return (
        <div>
            {/* Banner */}
            <div className="row m-0" style={{ backgroundColor: 'lightgray' }}>
                <div className='col m-1 d-flex justify-content-end' style={{ color: 'gray' }}>{`Need Help? >`}</div>
            </div>
            {/* Upper */}
            <div className="row align-items-center mx-auto" style={{ maxWidth: '1200px' }}>
                <div className="col d-flex justify-content-start">
                    <Link to="/"><Logo style={{ color: 'black' }} /></Link>
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
                        <CartButton/>
                    </div>
                </div>
            </div>
            <hr className="m-0" />
            {/* Lower */}
            <div className="row m-0">
                <div className="col d-flex justify-content-center">
                    {getCategories()}
                </div>
            </div>
            <hr className="m-0" />
        </div>
    );
}

export default Navbar;