import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../store/authSlice';
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import { useRef, useState } from 'react';
import Dropdown from 'bootstrap/js/dist/dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const UserButton = () => {
    const dropdownRef = useRef(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector((state: RootState) => state.auth);

    const handleClick = () => {
        if (isLoggedIn) {
            navigate('/account');
        } else {
            new Dropdown(dropdownRef.current);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));

        if (dropdownRef.current) {
            const dropdownInstance = Dropdown.getInstance(dropdownRef.current);
            if (dropdownInstance) {
                dropdownInstance.hide();
            }
        }
    };

    return (

        <div className="dropdown">
            <button type="button" ref={dropdownRef} onClick={handleClick} className="btn" {...(!isLoggedIn ? { 'data-bs-toggle': 'dropdown' } : {})} aria-expanded="false" data-bs-auto-close="outside">
                <UserIcon style={{ height: '25px', color: isLoggedIn ? 'gray' : 'black' }} />
            </button>
            <form className="dropdown-menu p-4" onSubmit={handleLogin}>
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
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                        <label className="form-check-label" htmlFor="dropdownCheck2">
                            Remember me
                        </label>
                    </div>
                </div>
                {auth.error && <div className="alert alert-danger">{auth.error}</div>}
                <button type="submit" className="btn btn-secondary">Sign in</button>
            </form>
        </div>


    );
};

export default UserButton;