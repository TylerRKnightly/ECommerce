import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../store/authSlice';
import { ReactComponent as UserIcon } from '../../assets/user-solid.svg'
import authService from '../../services/authService';

const UserButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleClick = () => {
        console.log('login/out')
        if (isLoggedIn) {
            console.log('out')
            authService.logout();
            dispatch(logout());
            navigate('/');
        } else {
            console.log('in')
            navigate('/login');
        }
    };

    return (
        <button type="button" className="btn" onClick={handleClick}>
            <UserIcon style={{ height: '25px', color: isLoggedIn ? 'gray' : 'black' }} />
        </button>
    );
};

export default UserButton;