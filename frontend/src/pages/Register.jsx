import { useState } from "react";
function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		matchPassword: "",
	});

	const { name, email, password, matchPassword } = formData;
	return (
		<>
			<section>
				<h1>Register</h1>
				<p>Please Create a new account</p>
			</section>
			<section className="form">
				<form>
					<div className="form-group">
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							placeholder="Please eneter your name"
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							placeholder="Please eneter your email"
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							id="password"
							value={password}
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
						/>
					</div>
					<div className="form-group">
						<div className="btn">Register</div>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
