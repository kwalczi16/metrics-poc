import React, { createContext, FC, Props, useEffect, useState } from "react";
import axios from "axios";

interface DataType {
	topology: object[];
}

export const DataContext = createContext<DataType>({
	topology: [],
});

export const DataProvider: FC = ({ children }) => {
	const api = axios.create({
		baseURL: "http://localhost:8080",
		headers: {
			Accept: "application/json",
			"X-Scope-OrgID": "aiops-central",
		},
	});

	const [topology, setTopology] = useState<object[]>([]);

	useEffect(() => {
		api.get("/topology").then((res) => {
			res.data.filter((item: any) => {
				return (
					item["namespace"] === "cortex" &&
					setTopology((prev) => [...prev, item])
				);
			});
			// setTopology(res.data);
		});
	}, []);

	return (
		<DataContext.Provider
			value={{
				topology,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
