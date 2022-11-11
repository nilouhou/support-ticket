import { useState } from "react";
import Modal from "react-modal";

const GeneralModal = ({ children, modalIsClosed, modalIsOpen }) => {
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

	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={modalIsClosed}
				style={customStyles}
			>
				<button className="btn-close" onClick={modalIsClosed}>
					x
				</button>
				{children}
			</Modal>
		</div>
	);
};

export default GeneralModal;
