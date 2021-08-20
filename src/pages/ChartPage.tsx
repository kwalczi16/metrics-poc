import React from "react";
import { Chartjs } from "../components/Chartjs.component";
import { D3js } from "../components/D3js.component";
import { Recharts } from "../components/Recharts.component";

export const ChartPage: React.FC = () => {
	return (
		<div>
			<h3>Recharts</h3>
			<Recharts />
			<br />
			<br />
			<h3>D3JS</h3>
			<D3js />
			<br />
			<br />
			<h3>Chart.js (React)</h3>
			<Chartjs />
		</div>
	);
};
