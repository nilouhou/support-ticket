import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, createTicket } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";

const NewTicket = () => {
	const { user } = useSelector((state) => state.auth);
	const { name, email } = user;

	const { isSuccess, isError, message, isLoading } = useSelector(
		(state) => state.tickets
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			dispatch(reset());
			navigate("/tickets");
		}

		dispatch(reset());
	}, [dispatch, isError, isSuccess, navigate, message]);

	const [product, setProduct] = useState("");
	const [description, setDescription] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(product, description);
		const ticketData = {
			product,
			description,
		};
		dispatch(createTicket(ticketData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className="form">
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<input type="text" className="form-control" value={name} disabled />
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Email</label>
					<input type="text" className="form-control" value={email} disabled />
				</div>
				<form onSubmit={onSubmitHandler}>
					<div className="form-group">
						<label htmlFor="product">Product</label>
						<select
							name="product"
							id="product"
							value={product}
							onChange={(e) => setProduct(e.target.value)}
						>
							<option value="iPhone">iPhone</option>
							<option value="Macbook Pro">Macbook Pro</option>
							<option value="iMac">iMac</option>
							<option value="iPad">iPad</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description of the issue</label>
						<textarea
							name="description"
							id="description"
							className="form-control"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default NewTicket;
