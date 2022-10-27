import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isSucess, isError, message, isLoading } = useSelector(
		(state) => state.auth
	);

	//Form data and functionality
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const changeHandler = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSucess || user) {
			navigate("/");
		}
	}, [isError, message, isSucess, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(loginThunk(userData));

		if (isLoading) {
			<Spinner />;
		}
	};
	return (
		<>
			<section>
				<h1>Login</h1>
				<p>Please Login into your account</p>
			</section>
			<section className="form">
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							placeholder="Please eneter your email"
							onChange={changeHandler}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={changeHandler}
							placeholder="Please eneter your password"
						/>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
