import React from "react";
import { Link } from "react-router-dom";

const BackBtn = ({ url }) => {
	return (
		<>
			<Link to={url}>
				<button className="btn">Back</button>
			</Link>
		</>
	);
};

export default BackBtn;
