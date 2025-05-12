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
		<div className="container py-4" style={{ maxWidth: '800px' }}>
			<h2 className="mb-4">Account Overview</h2>

			{/* Order List */}
			<section className="mb-5">
				<h4 className="mb-3">Recent Orders</h4>
				{orders.length === 0 ? (
					<p className="text-muted">No orders found.</p>
				) : (
					<ul className="list-group">
						{orders.map((o) => (
							<li key={o._id} className="list-group-item d-flex justify-content-between align-items-center">
								<div>
									<small className="text-muted">{new Date(o.createdAt).toLocaleDateString()}</small><br />
									<strong>Order ID:</strong> {o._id}
								</div>
								<span className={`badge ${o.isDelivered ? 'bg-success' : 'bg-warning text-dark'}`}>
									{o.isDelivered ? 'Delivered' : 'Processing'}
								</span>
							</li>
						))}
					</ul>
				)}
			</section>

			{/* Personal Info */}
			<section className="mb-5">
				<h4 className="mb-3">Personal Information</h4>
				<div className="border p-3 rounded bg-light">
					<p className="mb-1"><strong>First Name:</strong> {user?.firstName || '-'}</p>
					<p className="mb-1"><strong>Last Name:</strong> {user?.lastName || '-'}</p>
					<p className="mb-0"><strong>Email:</strong> {user?.email || '-'}</p>
				</div>
			</section>

			{/* Address Info */}
			<section>
				<h4 className="mb-3">Shipping Address</h4>
				<div className="border p-3 rounded bg-light">
					{user?.shippingAddress?.address
						? <p className="mb-0">{user.shippingAddress.address}</p>
						: <p className="text-muted mb-0">No shipping address available.</p>
					}
				</div>
			</section>
		</div>
	);
}

export default User;