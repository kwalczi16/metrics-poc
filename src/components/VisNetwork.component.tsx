import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Network } from "vis-network";
import { DataContext } from "../context/Data.context";

interface Node {
	id: string;
	label: string;
}
interface topologyItem {
	name: string;
	namespace: string;
	connections?: object[];
}

export const VisNetwork: React.FC = () => {
	const { topology } = useContext(DataContext);

	const nodes: Node[] = useMemo(() => {
		return topology.map((node: any) => {
			return {
				id: node["name"],
				label: node["name"],
				group: node["namespace"],
			};
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

	const showService = (id: string | number) => {
		console.log(id);
		return topology.filter((item: any) => {
			// console.log(id === item.name);
			return (
				id === item.name &&
				alert(
					`namespace: ${item.namespace}, name: ${item.name}, connections: ${
						item.connections?.length || 0
					}`
				)
			);
		});
		// console.log(nodeData.name);
	};

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

	const [isHierarchical, setIsHierarchical] = useState(false);

	const [options, setOptions] = useState({
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
			// solver: "forceAtlas2Based",
			solver: "repulsion",
			repulsion: {
				nodeDistance: 250,
			},
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
			arrows: {
				from: {
					enabled: true,
					type: "arrow",
				},
			},
		},
		layout: {
			randomSeed: 0,
			improvedLayout: true,
			clusterThreshold: 150,
			hierarchical: {
				enabled: isHierarchical,
				levelSeparation: 150,
				nodeSpacing: 150,
				treeSpacing: 150,
				blockShifting: true,
				edgeMinimization: true,
				parentCentralization: true,
				direction: "UD", // UD, DU, LR, RL
				sortMethod: "directed", // hubsize, directed
				shakeTowards: "roots", // roots, leaves
			},
		},
		groups: {
			cortex: {
				shape: "image",
				image:
					"https://cncf-branding.netlify.app/img/projects/cortex/stacked/color/cortex-stacked-color.png",
			},
			ambassador: {
				shape: "image",
				image:
					"https://d33wubrfki0l68.cloudfront.net/b815b9e7d5f8bc6e86a81ff76ef2e42d96b2584d/50a27/images/hero-penguin.svg",
			},
			reporting: {
				shape: "icon",
				color: {
					background: "gray",
				},
				icon: {
					face: "Ionicons",
					code: "\uf391",
					size: 50,
					color: "red",
				},
			},
			monitoring: {
				shape: "icon",
				icon: {
					face: "Ionicons",
					code: "\uf3cd",
				},
			},
			logs: {
				shape: "image",
				image: "https://img.stackshare.io/service/10079/loki.png",
			},
			argo: {
				shape: "image",
				image:
					"https://cncf-branding.netlify.app/img/projects/argo/stacked/color/argo-stacked-color.png",
			},
			"kube-system": {
				shape: "image",
				image: "https://kubernetes.io/images/favicon.png",
			},
			default: {
				shape: "database",
			},
		},
	});

	const toggleLayout = () => {
		setIsHierarchical(!isHierarchical);
		setOptions({
			...options,
			layout: {
				...options.layout,
				hierarchical: {
					...options.layout.hierarchical,
					enabled: !options.layout.hierarchical.enabled,
				},
			},
		});
	};

	useEffect(() => {
		const network: any =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges }, options);
		console.log(edges);
		network.on("stabilizationIterationsDone", function () {
			network.setOptions({ physics: false });
			// network.stabilize();
		});
		network.on("click", (properties: any) => {
			console.log(properties);
			const selection = properties.nodes;
			if (selection.length > 0) {
				showService(selection[0]);
			}
		});
	}, [visJsRef, nodes, options]);

	return (
		<>
			<button onClick={toggleLayout}>Toggle layout</button>
			<span>{!isHierarchical ? "Spread" : "Hierarchical"}</span>
			<div ref={visJsRef}></div>
		</>
	);
};
