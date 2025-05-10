import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/authSlice";
import authService from "../services/authService";

const User = () => {
        const dispatch = useAppDispatch();
        const navigate = useNavigate();

    const handleLogout = () => {
            authService.logout();
            dispatch(logout());
            navigate('/');
    };

    return (<><button className="btn" onClick={handleLogout}>Logout</button></>);
}

export default User;