import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";

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
		dispatch(getTickets());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return <div>Tickets</div>;
};

export default Tickets;
