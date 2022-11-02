import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackBtn from "../components/BackBtn";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
	const { isLoading, tickets, isSucess } = useSelector(
		(state) => state.tickets
	);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSucess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSucess]);

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			dispatch(getTickets());
		}
		return () => {
			ignore = true;
		};
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BackBtn url="/" />
			<h1>Tickets</h1>
			<div className="tickets">
				<div className="ticket-headings">
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{console.log(tickets)}
				{tickets.map((ticket) => {
					console.log(ticket.product);
					return <TicketItem key={ticket._id} ticket={ticket} />;
				})}
			</div>
		</>
	);
};

export default Tickets;
