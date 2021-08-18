import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../context/Data.context";

export interface Coords {
	x: any;
	y: any;
	interpolate: string;
}

export const D3js: React.FC = () => {
	const { metrics } = useContext(DataContext);
	// const [data, setData] = useState<object[]>([
	// 	{ date: 16098767894, value: 240 },
	// ]);

	// const setMetrics = () => {
	// 	// setData([]);
	// 	const valuesArray = Object.values(metrics.values);
	// 	valuesArray.map((item: any) => {
	// 		for (const [key, value] of Object.entries(item)) {
	// 			return setData((prev) => [...prev, { date: key, value }]);
	// 		}
	// 	});
	// };

	const svgRef = useRef<SVGSVGElement | any>();

	const [data, setData] = useState<number[]>([25, 3, 18, 45, 60, 20]);

	useEffect(() => {
		console.log(svgRef);

		const svg = d3.select(svgRef.current);

		const xScale = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([0, 300]);

		const yScale = d3.scaleLinear().domain([0, 75]).range([150, 0]);

		const xAxis: any = d3
			.axisBottom(xScale)
			.ticks(data.length)
			.tickFormat((index: any) => index + 1);
		svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

		const yAxis: any = d3.axisRight(yScale);
		svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

		// xAxis(svg.select(".x-axis"));

		const myLine = d3
			.line<number>()
			.x((value, index) => xScale(index))
			.y(yScale)
			.curve(d3.curveCardinal);
		// svg
		// 	.selectAll("circle")
		// 	.data(data)
		// 	.join("circle")
		// 	.attr("r", (value) => value)
		// 	.attr("cx", (value) => value * 2)
		// 	.attr("cy", (value) => value * 2)
		// 	.attr("stroke", "red");
		svg
			.selectAll(".line")
			.data([data])
			.join("path")
			.attr("class", "line")
			.attr("d", myLine)
			.attr("fill", "none")
			.attr("stroke", "blue");
	}, [data]);

	return (
		<>
			<svg ref={svgRef}>
				<g className="x-axis" />
				<g className="y-axis" />
			</svg>
		</>
	);
};
