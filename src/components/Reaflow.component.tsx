import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	Canvas,
	CanvasRef,
	Icon,
	Node,
	NodeProps,
	Label,
	MarkerArrow,
} from "reaflow";
import { DataContext } from "../context/Data.context";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Node {
	id: string;
	text: string;
	data: { namespace: string };
}

const nodes = [
	{
		id: "1",
		text: "1",
	},
	{
		id: "2",
		text: "2",
	},
];

// const edges = [
// 	{
// 		id: "1-2",
// 		from: "1",
// 		to: "2",
// 	},
// ];

const nodeIcon = (namespace: string) => {
	switch (namespace) {
		case "cortex":
			return {
				url: "https://cncf-branding.netlify.com/img/projects/cortex/stacked/color/cortex-stacked-color.png",
				height: 30,
				width: 30,
			};
			break;
		default:
			return false;
	}
};

export const Reaflow = () => {
	const [zoom, setZoom] = useState<number>(0.7);
	const ref = useRef<any | null>(null);
	const { topology } = useContext(DataContext);

	const nodes: Node[] = useMemo(() => {
		return topology.map((node: any) => {
			return {
				id: node["name"],
				text: node["name"],
				data: {
					namespace: node["namespace"],
				},
				icon: nodeIcon(node["namespace"]),
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
			.flatMap((args: any, id: number) => {
				const [connections, nodeName] = args;
				return connections.map((connection: any) => ({
					id: `${nodeName}_${connection.dstServiceName}`,
					from: nodeName,
					to: connection.dstServiceName,
				}));
			});
	}, [topology]);

	const nodeClick = (node: NodeProps) => {
		alert(node.properties.data.namespace);
	};

	useEffect(() => {
		console.log("nodes", nodes);
	}, [topology]);

	return (
		<>
			<pre
				style={{
					zIndex: 9,
					position: "absolute",
					bottom: 15,
					right: 15,
					background: "rgba(0, 0, 0, .5)",
					padding: 20,
					color: "white",
				}}
			>
				Zoom: {zoom}
				<br />
				<button
					style={{ display: "block", width: "100%", margin: "5px 0" }}
					onClick={() => ref.current.zoomIn()}
				>
					Zoom In
				</button>
				<button
					style={{ display: "block", width: "100%", margin: "5px 0" }}
					onClick={() => ref.current.zoomOut()}
				>
					Zoom Out
				</button>
				<button
					style={{ display: "block", width: "100%" }}
					onClick={() => ref.current.fitCanvas()}
				>
					Fit
				</button>
			</pre>
			<TransformWrapper
				// wheel={{ step: 20 }}
				panning={{ velocityDisabled: false }}
				maxScale={4}
				minScale={0}
				limitToBounds={false}
				centerOnInit={true}
			>
				<TransformComponent>
					<Canvas
						ref={ref}
						// width={2000}
						// height={2000}
						layoutOptions={{
							"elk.nodeLabels.placement": "INSIDE V_CENTER H_RIGHT",
							"elk.algorithm": "org.eclipse.elk.layered",
							"elk.direction": "DOWN",
							nodeLayering: "INTERACTIVE",
							"org.eclipse.elk.edgeRouting": "UNDEFINED",
							"elk.layered.unnecessaryBendpoints": "true",
							"elk.layered.spacing.edgeNodeBetweenLayers": "50",
							"org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment":
								"BALANCED",
							"org.eclipse.elk.layered.cycleBreaking.strategy": "DEPTH_FIRST",
							"org.eclipse.elk.insideSelfLoops.activate": "true",
							separateConnectedComponents: "true",
							"spacing.componentComponent": "20",
							spacing: "25",
							"spacing.nodeNodeBetweenLayers": "20",
						}}
						// zoomable={true}
						maxZoom={0.5}
						minZoom={-0.9}
						center={false}
						// zoom={zoom}
						fit={true}
						zoomable={false}
						nodes={nodes}
						edges={edges}
						node={(node: NodeProps) => (
							<Node
								{...node}
								onClick={() => alert(node.properties.data.namespace)}
								icon={<Icon />}
								style={{ fill: "white", stroke: "1a192b" }}
								label={<Label style={{ fill: "black" }} />}
								dragCursor="grab"
								dragType="all"
							/>
						)}
						arrow={<MarkerArrow style={{ fill: "#b1b1b7" }} />}
						maxWidth={800}
						maxHeight={600}
						onLayoutChange={(layout) => console.log("layout", layout)}
					/>
				</TransformComponent>
			</TransformWrapper>
		</>
	);
};
