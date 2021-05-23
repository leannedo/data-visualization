import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./LineChart.scss";

const LineChart = ({ title, data, width, height, className }) => {
  const [isZoom, setIsZoom] = useState(false);

  const drawChart = () => {
    // constant definition
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const canvas = d3.select("." + className).select(".canvas");

    if (canvas) {
      canvas.remove();
    }

    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length / 10);

    const yMin = isZoom ? Math.min(...data) - 10 : 0;
    const yMax = isZoom ? Math.max(...data) + 10 : Math.max(...data) + 30;

    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

    const yAxis = d3.axisLeft(yScale).ticks(10);

    const line = d3
      .line()
      .x((value, i) => xScale(i))
      .y(yScale);
    // .curve(d3.curveMonotoneX); // add curve or not

    // create a canvas
    const svg = d3
      .select("." + className)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "canvas");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // draw the x axis
    const gX = g
      .append("g")
      .attr("class", "x-axis") //styling
      .attr("transform", `translate(0,${height})`)
      // move the line across the height to 0
      .call(xAxis); // draw the line and tick

    // draw the y axis
    const gY = g
      .append("g")
      .attr("class", "y-axis") //styling
      .call(yAxis);

    // draw the actual line
    const gLine = g
      .append("g")
      .attr("clip-path", "url(#clip)")
      .append("path")
      .attr("class", "dataA")
      .attr("d", line(data));

    // Zoom Function
    const onZoom = (event) => {
      const new_yScale = event.transform.rescaleY(yScale);

      // update axes
      gY.call(yAxis.scale(new_yScale));

      // update line
      gLine.attr("transform", event.transform);
    };

    const zoom = d3
      .zoom()
      .scaleExtent([1, 3])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", onZoom);

    // append zoom area
    g.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
  };

  useEffect(() => drawChart(), [data, isZoom]);

  return (
    <>
      <h1>{title}</h1>
      <div className={className} />
      <button onClick={() => setIsZoom(!isZoom)}>Magnify</button>
    </>
  );
};

export default LineChart;
