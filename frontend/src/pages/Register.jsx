import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { registerThunk } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		matchPassword: "",
	});

	const { name, email, password, matchPassword } = formData;

	const dispatch = useDispatch();
	const { user, isError, isSucess, message, isLoading } = useSelector(
		(state) => state.auth
	);

	const navigate = useNavigate();

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

		if (password !== matchPassword) {
			toast.error("Passwords do not match");
		}

		const userData = {
			name,
			email,
			password,
		};

		dispatch(registerThunk(userData));

		if (isLoading) {
			<Spinner />;
		}
	};
	return (
		<>
			<section>
				<h1>Register</h1>
				<p>Please Create a new account</p>
			</section>
			<section className="form">
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							placeholder="Please eneter your name"
							onChange={changeHandler}
						/>
					</div>
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
						<input
							type="password"
							name="matchPassword"
							id="matchPassword"
							value={matchPassword}
							placeholder="Please confirm your password"
							onChange={changeHandler}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
