import React from "react";
import { Reaflow } from "../components/Reaflow.component";
import { VisNetwork } from "../components/VisNetwork.component";

export const TopologyPage = () => {
	return (
		<div>
			<h2>Vis Network</h2>
			<VisNetwork />
			<h2>Reaflow</h2>
			<Reaflow />
		</div>
	);
};
