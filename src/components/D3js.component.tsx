import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../context/Data.context";

export const D3js: React.FC = () => {
	// const { metrics } = useContext(DataContext);
	// const [data, setData] = useState<object[]>([]);

	// const setMetrics: any = () => {
	// 	setData([]);
	// 	const valuesArray = Object.values(metrics.values);
	// 	return valuesArray.map((item: object) => {
	// 		for (const [key, value] of Object.entries(item)) {
	// 			return setData((prev) => [
	// 				...prev,
	// 				{ date: parseInt(key), value: parseInt(value) },
	// 			]);
	// 		}
	// 	});
	// };

	const svgRef = useRef<SVGSVGElement | any>();

	const [data, setData] = useState<object[]>([
		{ date: 100, value: 240 },
		{ date: 101, value: 208 },
		{ date: 102, value: 219 },
		{ date: 103, value: 171 },
		{ date: 104, value: 200 },
		{ date: 105, value: 222 },
	]);

	useEffect(() => {
		// setMetrics();
		console.log(data.map((d: any) => d.date));

		const svg = d3.select(svgRef.current);

		const xScale = d3
			.scaleLinear()
			.domain([
				d3.min(data.map((d: any) => d.date)),
				d3.max(data.map((d: any) => d.date)),
			])
			.range([0, 300]);

		const yScale = d3.scaleLinear().domain([0, 280]).range([150, 0]);

		const xAxis: any = d3
			.axisBottom(xScale)
			.ticks(data.length)
			.tickFormat((index: any) => index);
		svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

		const yAxis: any = d3.axisRight(yScale);
		svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

		console.log(data.map((d: any) => xScale(d.name)));

		const line = d3
			.line<any>()
			.x((d, index) => (300 / (data.length - 1)) * index)
			.y((d: any) => yScale(d.value))
			.curve(d3.curveCardinal);

		console.log(yScale);

		svg
			.selectAll(".line")
			.data([data])
			.join("path")
			.attr("class", "line")
			.attr("d", line)
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
