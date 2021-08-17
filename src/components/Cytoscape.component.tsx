import React, { useContext, useEffect, useMemo, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { DataContext } from "../context/Data.context";

interface Elements {
	nodes: any[];
	edges: any[];
}

export const Cytoscape: React.FC = () => {
	const { topology } = useContext(DataContext);

	const nodes = useMemo(() => {
		return topology.map((node: any) => {
			return { data: { id: node["name"], label: node["name"] } };
		});
	}, [topology]);

	const edges = useMemo(() => {
		return topology
			.filter((node: any) => {
				return "connections" in node;
			})
			.map((node: any) => {
				console.log(node);
				return [node["connections"], node["name"]];
			})
			.map((args) => {
				const [connections, nodeName] = args;
				return {
					data: { source: nodeName, target: connections.dstServiceName },
				};
			});
	}, [topology]);

	const layout = {
		name: "grid",
		fit: true,
		padding: 35,
	};

	const stylesheet = [
		{
			selector: "node",
			style: {
				width: "label",
				height: "label",
				shape: "round-rectangle",
				backgroundColor: "lightgreen",
				fontSize: "18x",
				label: "data(label)",
				textHalign: "center",
				textValign: "center",
			},
		},
		{
			selector: "edge",
			style: {
				width: 3,
				label: "data(label)",
			},
		},
	];

	useEffect(() => {
		console.log("edges", edges);
	}, [nodes, edges]);

	return (
		<>
			<CytoscapeComponent
				elements={CytoscapeComponent.normalizeElements({ nodes, edges })}
				style={{ width: "100%", height: "700px" }}
				stylesheet={stylesheet}
				layout={layout}
			/>
		</>
	);
};
