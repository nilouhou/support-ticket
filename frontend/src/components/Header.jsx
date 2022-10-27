import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logoutThunk, reset } from "../features/auth/authSlice";

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logoutThunk());
		dispatch(reset());
		navigate("/");
	};
	return (
		<div className="header">
			<div className="logo">
				<Link to="/">Support Desk</Link>
			</div>
			<nav>
				<ul>
					{user ? (
						<li>
							<button className="btn" onClick={logoutHandler}>
								<FaSignOutAlt />
								Logout
							</button>
						</li>
					) : (
						<>
							<li>
								<Link to="/register">
									<FaUser />
									Register
								</Link>
							</li>
							<li>
								<Link to="/login">
									<FaSignInAlt />
									Login
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
}

export default Header;
