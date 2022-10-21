import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

function Header() {
	return (
		<div className="header">
			<div className="logo">
				<Link to="/">Support Desk</Link>
			</div>
			<nav>
				<ul>
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
					<li>
						<Link to="/">
							<FaSignOutAlt />
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Header;
