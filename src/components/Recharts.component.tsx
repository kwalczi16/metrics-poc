import React, { useState, useEffect, useContext } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import { DataContext } from "../context/Data.context";

export const Recharts: React.FC = () => {
	const { metrics } = useContext(DataContext);
	const [data, setData] = useState<object[]>([]);

	const setMetrics = () => {
		setData([]);
		const valuesArray = Object.values(metrics.values);
		valuesArray.map((item: any) => {
			for (const [key, value] of Object.entries(item)) {
				return setData((prev) => [...prev, { name: key, value }]);
			}
		});
	};

	useEffect(() => {
		setMetrics();
		console.log(data);
	}, [metrics]);

	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

	return (
		<LineChart width={1000} height={500} data={data} margin={margin}>
			<Line type="monotone" dataKey="value" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
			<Tooltip />
			<XAxis dataKey="name" angle={-45} />
			<YAxis domain={["dataMin - 0.001", "dataMax + 0.001"]} />
		</LineChart>
	);
};
