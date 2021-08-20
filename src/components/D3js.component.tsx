import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { DataContext } from "../context/Data.context";

export const D3js: React.FC = () => {
	const { metrics } = useContext(DataContext);

	const data = useMemo(() => {
		const array: object[] = [];
		const valuesArray = Object.values(metrics.values);
		valuesArray.map((item: object) => {
			for (const [key, value] of Object.entries(item)) {
				array.push({ date: parseInt(key), value: parseInt(value) });
			}
		});
		return array;
	}, [metrics]);

	const svgRef = useRef<SVGSVGElement | any>();

	const width = 800;
	const height = 300;

	useEffect(() => {
		const svg = d3.select(svgRef.current);

		const xScale = d3
			.scaleLinear()
			.domain([
				d3.min(data.map((d: any) => d.date)),
				d3.max(data.map((d: any) => d.date)),
			])
			.range([0, width]);

		const yScale = d3.scaleLinear().domain([239, 241]).range([height, 0]);

		const xAxis: any = d3
			.axisBottom(xScale)
			.ticks(10)
			.tickFormat((index: any) => index);
		svg
			.select(".x-axis")
			.style("transform", `translateY(${height}px)`)
			.call(xAxis);

		const yAxis: any = d3.axisRight(yScale);
		svg
			.select(".y-axis")
			.style("transform", `translateX(${width}px)`)
			.call(yAxis);

		console.log(data.map((d: any) => xScale(d.name)));

		const line = d3
			.line<any>()
			.x((d, index) => (width / (data.length - 1)) * index)
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
			<svg ref={svgRef} width={width} height={height}>
				<g className="x-axis" />
				<g className="y-axis" />
			</svg>
		</>
	);
};
