import { useState } from "react";
import Modal from "react-modal";

const TicketModal = () => {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			padding: "2rem",
		},
	};

	Modal.setAppElement("#root");
	Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.8)";

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<button className="btn-close" onClick={closeModal}>
					close
				</button>
				<form>
					<div className="form-group">
						<textarea
							name="noteText"
							id="noteText"
							className="form-control"
							placeholder="Note text"
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default TicketModal;
