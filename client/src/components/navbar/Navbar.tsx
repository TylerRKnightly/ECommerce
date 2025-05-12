import { categories } from '../../data/mockCategories';
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass-solid.svg'
import { Link, useLocation } from 'react-router-dom';
import CartButton from '../cartButton/CartButton';
import UserButton from '../userButton/UserButton';
import './Navbar.css'

const Navbar = () => {
    const hideNavbarPaths = ['/checkout'];
    const atCheckout = hideNavbarPaths.includes(useLocation().pathname);

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
            {!atCheckout && (<>
                {/* Banner */}
                <div className="row m-0" style={{ backgroundColor: 'lightgray' }}>
                    <div className='col m-1 d-flex justify-content-end' style={{ color: 'gray' }}>{`Need Help? >`}</div>
                </div>
            </>)}


            {/* Upper */}
            <div className="row align-items-center mx-auto" style={{ maxWidth: '1200px' }}>
                <div className="col d-flex justify-content-start">
                    <Link to="/"><Logo style={{ color: 'black' }} /></Link>
                </div>
                {!atCheckout && (<>
                    <div className="col-5" style={{ maxWidth: '600px' }}>
                        <form className="d-flex">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: '10px 0 0 10px', outline: 'none', boxShadow: 'none' }} />
                            <button className="btn btn-outline-dark" type="submit" style={{ width: '50px', borderRadius: '0 10px 10px 0' }}><SearchIcon /></button>
                        </form>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <UserButton />
                        <span><CartButton /></span>
                    </div>
                </>)}
            </div>
            <hr className="m-0" />

            {!atCheckout && (<>
                {/* Lower */}
                <div className="row m-0">
                    <div className="col d-flex justify-content-center">
                        {getCategories()}
                    </div>
                </div>
                <hr className="m-0 pt-n4" />
            </>)}
        </div>
    );
}

export default Navbar;