import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackBtn from "../components/BackBtn";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { closeTicket, getTicket } from "../features/tickets/ticketSlice";
import { getNotes, addNotes } from "../features/notes/notSlice";
import { NoteItem } from "../components/NoteItem";
import GeneralModal from "../components/Modal/GeneralModal";
import NoteForm from "../components/Modal/NoteForm";
import { isOpen, isClose } from "../features/modal/modalSlice";

const Ticket = () => {
	const { ticket, message, isError, isSuccess, isLoading } = useSelector(
		(state) => state.tickets
	);

	const { notes, isLoading: noteIsLoading } = useSelector(
		(state) => state.notes
	);

	const { modalIsOpen, modalIsClosed } = useSelector((state) => state.modal);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
	}, [dispatch, message, isError, isSuccess, ticketId]);

	const closeHandler = () => {
		dispatch(closeTicket(ticketId));
		navigate("/tickets");
		toast.success("Your ticket has been closed");
	};

	const createNote = (note) => {
		const noteData = {
			ticketId,
			note,
		};
		dispatch(addNotes(noteData));
		dispatch(isClose());
	};

	const openModal = () => {
		dispatch(isOpen());
	};

	if (isLoading || noteIsLoading) {
		return <Spinner />;
	}

	return (
		<div className="ticket-page">
			<header className="ticket-header">
				<BackBtn url="/tickets" />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>
					Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
				</h3>
				<h3>Product: {ticket.product}</h3>
				<hr />
				<div className="ticket-desc">
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<button onClick={openModal} className="btn">
					Add Note
				</button>
				<GeneralModal modalIsOpen={modalIsOpen} modalIsClosed={modalIsClosed}>
					<NoteForm createNote={createNote} />
				</GeneralModal>
				{notes.lenght && (
					<>
						<h2>Notes</h2>
						{notes.map((note) => {
							return <NoteItem key={note._id} note={note} />;
						})}
					</>
				)}
			</header>
			{ticket.status !== "closed" && (
				<button className="btn btn-danger btn-block" onClick={closeHandler}>
					Close the Ticket
				</button>
			)}
		</div>
	);
};

export default Ticket;
