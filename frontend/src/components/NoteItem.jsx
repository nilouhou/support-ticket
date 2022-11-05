import { useSelector } from "react-redux";

export const NoteItem = ({ note }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className={`note ${note.isStaff ? "note-stuff" : "note-user"}`}>
			<h4>
				Note from{" "}
				{note.isStaff ? <span>Staff</span> : <span>user: {user.name}</span>}
			</h4>
			<p>{note.text}</p>
			<div className="note-date">
				{new Date(note.createdAt).toLocaleString("en-US")}
			</div>
		</div>
	);
};
