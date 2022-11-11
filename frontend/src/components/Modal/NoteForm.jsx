import { useState } from "react";

const NoteForm = ({ createNote }) => {
	const [note, setNote] = useState("");

	const changeHandler = (e) => {
		setNote(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		createNote(note);
	};

	return (
		<>
			<h3>Please add any more details that can help us to resolve the issue</h3>
			<form>
				<div className="form-group">
					<textarea
						name="noteText"
						id="noteText"
						className="form-control"
						placeholder="Note text"
						value={note}
						onChange={changeHandler}
					></textarea>
				</div>
				<div className="form-group">
					<button className="btn" type="submit" onClick={submitHandler}>
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default NoteForm;
