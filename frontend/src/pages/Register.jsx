import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		matchPassword: "",
	});

	const { name, email, password, matchPassword } = formData;

	const changeHandler = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== matchPassword) {
			toast.error("Passwords do not match");
		}
		console.log(formData);
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
