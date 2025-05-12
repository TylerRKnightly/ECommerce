import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearAuthError, login, logout } from '../../store/authSlice';
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import { useEffect, useRef, useState } from 'react';
import Dropdown from 'bootstrap/js/dist/dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const UserButton = () => {
    let dropdownRef = useRef(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector((state: RootState) => state.auth);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
        if (location.pathname === '/account') {
            navigate('/');
        }
    };

    const closeDropdown = () => {
        const dropdown = Dropdown.getOrCreateInstance(dropdownRef.current);
        if (dropdown) {
            dropdown.hide();
        }
    };

    useEffect(() => {
        if (dropdownRef.current) {
            new Dropdown(dropdownRef.current);
        }
    }, []);

    useEffect(() => {
        closeDropdown();
        if (isLoggedIn && dropdownRef.current) {
            setEmail('');
            setPassword('');
            dispatch(clearAuthError());
        }
    }, [isLoggedIn, dispatch]);

    return (
        <div className="dropdown">
            <button type="button" ref={dropdownRef} className="btn" data-bs-toggle='dropdown' aria-expanded="false" data-bs-auto-close="outside">
                <UserIcon style={{ height: '25px', color: isLoggedIn ? 'gray' : 'black' }} />
            </button>

            <div className="dropdown-menu dropdown-menu-lg-end p-4" style={{ ...(isLoggedIn ? { width: '100px' } : { width: '250px' }) }}>
                {isLoggedIn ? (
                    <>
                        <Link to="/account" className="dropdown-item" onClick={closeDropdown}>Account</Link>
                        <div className="dropdown-divider" />
                        <button onClick={handleLogout} className="btn btn-danger w-100 mt-2">Logout</button>
                    </>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' required />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="dropdownCheck2">Remember me</label>
                                <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                            </div>
                        </div>
                        {auth.error && <div className="alert alert-danger">{auth.error}</div>}
                        <button type="submit" className="btn btn-secondary w-100">Sign in</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserButton;