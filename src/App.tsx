import React from "react";
import "./App.css";
import { Cytoscape } from "./components/Cytoscape.component";
import { VisNetwork } from "./components/VisNetwork.component";
import { DataProvider } from "./context/Data.context";

function App() {
	return (
		<div className="App">
			<DataProvider>
				<div>visjs</div>
				<VisNetwork />
				<div>cytoscape</div>
				<Cytoscape />
			</DataProvider>
		</div>
	);
}

export default App;
