import React from "react";
import "./App.css";
import { VisNetwork } from "./components/VisNetwork.component";
import { DataProvider } from "./context/Data.context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav.component";
import { ChartPage } from "./pages/ChartPage";

function App() {
	return (
		<div className="App">
			<Router>
				<DataProvider>
					<Nav />
					<Switch>
						<Route exact path="/topology" component={VisNetwork} />
						<Route exact path="/metrics" component={ChartPage} />
					</Switch>
				</DataProvider>
			</Router>
		</div>
	);
}

export default App;
