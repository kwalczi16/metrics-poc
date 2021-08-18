import React from "react";
import { Link } from "react-router-dom";

export const Nav: React.FC = () => {
	return (
		<nav>
			<Link to="/topology">Topology</Link>
			<Link to="/metrics">Metrics</Link>
		</nav>
	);
};
