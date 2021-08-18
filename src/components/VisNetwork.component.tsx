import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Network } from "vis-network";
import { DataContext } from "../context/Data.context";

interface Node {
	id: string;
	label: string;
}

export const VisNetwork: React.FC = () => {
	const { topology } = useContext(DataContext);

	const nodes: Node[] = useMemo(() => {
		return topology.map((node: any) => {
			return { id: node["name"], label: node["name"] };
		});
	}, [topology]);

	const edges = useMemo(() => {
		return topology
			.filter((node: any) => {
				return "connections" in node;
			})
			.map((node: any) => {
				return [node["connections"], node["name"]];
			})
			.flatMap((args: any) => {
				const [connections, nodeName] = args;
				return connections.map((connection: any) => ({
					from: nodeName,
					to: connection.dstServiceName,
				}));
			});
	}, [topology]);

	// const edges = [
	// 	{ from: 1, to: 3 },
	// 	{ from: 1, to: 2 },
	// 	{ from: 2, to: 4 },
	// 	{ from: 2, to: 5 },
	// 	{ from: 3, to: 3 },
	// 	{ from: 5, to: 6 },
	// 	{ from: 6, to: 1 },
	// ];

	const visJsRef = useRef<HTMLDivElement>(null);

	const options = {
		height: "500px",
		physics: {
			forceAtlas2Based: {
				gravitationalConstant: -26,
				centralGravity: 0.005,
				springLength: 230,
				springConstant: 0.18,
				avoidOverlap: 1.5,
			},
			maxVelocity: 146,
			solver: "forceAtlas2Based",
			timestep: 0.35,
			stabilization: {
				enabled: true,
				iterations: 1000,
				updateInterval: 25,
			},
		},
		nodes: {
			shape: "box",
		},
		edges: {
			smooth: false,
		},
		layout: {
			randomSeed: 0,
		},
	};

	useEffect(() => {
		const network: any =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges }, options);
		console.log(edges);
		network.on("stabilizationIterationsDone", function () {
			network.setOptions({ physics: false });
		});
	}, [visJsRef, nodes]);

	return (
		<>
			<div ref={visJsRef}></div>
		</>
	);
};
