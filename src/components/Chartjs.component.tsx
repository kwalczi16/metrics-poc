import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { DataContext } from "../context/Data.context";

const data = {
	labels: ["1", "2", "3", "4", "5", "6"],
	datasets: [
		{
			data: [12, 19, 3, 5, 2, 3],
			fill: false,
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgba(255, 99, 132, 0.2)",
		},
	],
};

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

export const Chartjs: React.FC = () => {
	const { metrics } = useContext(DataContext);

	return (
		<>
			<Line data={data} options={options} />
		</>
	);
};
