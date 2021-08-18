import React, { createContext, FC, Props, useEffect, useState } from "react";
import axios from "axios";

interface DataType {
	topology: object[];
	metrics: object[];
}

export const DataContext = createContext<DataType>({
	topology: [],
	metrics: [],
});

export const DataProvider: FC = ({ children }) => {
	const [topology, setTopology] = useState<object[]>([]);
	const [metrics, setMetrics] = useState<object[]>([]);

	const getTopology = (nameSpace?: string) => {
		axios.get("topology.json").then((res) => {
			console.log(res.data);
			if (nameSpace) {
				res.data.filter((item: any) => {
					return (
						item["namespace"] === nameSpace &&
						setTopology((prev) => [...prev, item])
					);
				});
			} else {
				setTopology(res.data);
			}
		});
	};

	const getMetrics = () => {
		axios.get("metrics.json").then((res) => {
			console.log(res.data.metricEntryList[0]);
			setMetrics(res.data.metricEntryList[0]);
		});
	};

	useEffect(() => {
		getTopology("cortex");
		getMetrics();
	}, []);

	return (
		<DataContext.Provider
			value={{
				topology,
				metrics,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
