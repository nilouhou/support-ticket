import { useState } from "react";
function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const changeHandler = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();

		console.log(formData);
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
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
