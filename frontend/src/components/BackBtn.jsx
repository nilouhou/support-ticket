import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackBtn = ({ url }) => {
	return (
		<>
			<Link to={url}>
				<button className="btn btn-reverse btn-back">
					<FaArrowCircleLeft />
					Back
				</button>
			</Link>
		</>
	);
};

export default BackBtn;
