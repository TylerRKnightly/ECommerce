// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../hooks/useAppDispatch";
// import { logout } from "../store/authSlice";
// import authService from "../services/authService";
import { useEffect, useState } from "react";
import { OrderData } from "../types/order";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL;

const User = () => {
	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();
	const [orders, setOrders] = useState<OrderData[]>([]);
    const user = useSelector((state: RootState) => state.auth?.user);

	useEffect(() => {
		const token = localStorage.getItem('token');

		const fetchProducts = async () => {
			try {
				const res = (await fetch(`${BASE_URL}/api/orders/mine`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}));
				if (!res) throw new Error('Failed to fetch orders');
				const data = await res.json();
				setOrders(data);
			} catch (err) {
				// setError((err as Error).message)
			} finally {
				// setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	// const handleLogout = () => {
	// 	authService.logout();
	// 	dispatch(logout());
	// 	navigate('/');
	// };

	return (
		<>
			<>
				<p>Order List</p>
				<div className="pb-4">
					{orders.map((o) => (
						<div key={o._id}>
							{`${o.createdAt} - ${o._id} - ${o.isDelivered}`}
						</div>
					))}
				</div>
			</>
			<>
				<p>Personal Info</p>
				<div className="pb-4">
					<p className="m-0">First Name: {user?.firstName || ''}</p>
					<p className="m-0">Last Name: {user?.lastName || ''}</p>
					<p className="m-0">Email Address: {user?.email || ''}</p>
				</div>
			</>
			<>
				<p>Address Management</p>
				<div className="pb-4">
					<p>{user?.shippingAddress?.address || ''}</p> 
				</div>
			</>
			{/* <button className="btn" onClick={handleLogout}>Logout</button> */}
		</>
	);
}

export default User;