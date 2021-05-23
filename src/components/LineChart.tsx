import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./LineChart.scss";

const LineChart = ({
  title,
  data,
  width = 700,
  height = 300,
  className,
  minTickSpace = 20,
}) => {
  const [isZoom, setIsZoom] = useState(false);

  const minDataPoint = Math.min(...data);
  const maxDataPoint = Math.max(...data);
  const minIndex = data.indexOf(minDataPoint);
  const maxIndex = data.indexOf(maxDataPoint);
  const avgDataPoint = data.reduce((acc, e) => acc + e, 0) / data.length;

  const sq = data.map((e) => Math.pow(e - avgDataPoint, 2));
  const standardDeviation = Math.sqrt(
    sq.reduce((acc, e) => acc + e, 0) / sq.length
  );

  const defineScales = () => {
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yOffset = 20;
    const yMin = isZoom ? minDataPoint - yOffset : 0;
    const yMax = maxDataPoint + yOffset;

    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

    return { xScale, yScale };
  };

  const drawChart = () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const container = d3.select("." + className);

    container.select("svg").remove();
    container.select(".tooltip").remove();

    // draw a canvas
    const svg = container
      .append("svg")
      .attr("class", "canvas")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    const { xScale, yScale } = defineScales();
    let newXScale = null;
    let newYScale = null;

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(width / minTickSpace)
      .tickSize(0);
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(height / minTickSpace)
      .tickSize(0);

    const lineDrawer = d3
      .line()
      .x((value, i) => xScale(i))
      .y(yScale);

    // draw grid
    g.append("g")
      .attr("class", "gridX")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(width / 100)
          .tickSize(-height)
          .tickFormat("")
      );

    g.append("g")
      .attr("class", "gridY")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(height / 50)
          .tickSize(-width)
          .tickFormat("")
      );

    // draw axis
    const gX = g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    const gY = g.append("g").attr("class", "y-axis").call(yAxis);

    // draw line
    const line = g
      .append("g")
      .attr("clip-path", "url(#clip)")
      .append("path")
      .attr("class", "data")
      .attr("d", lineDrawer(data));

    // draw min and max point
    const minMaxPointG = g.append("g");

    const minPoint = minMaxPointG
      .append("circle")
      .attr("r", 3)
      .attr("fill", "red")
      .attr("class", "minPoint")
      .attr(
        "transform",
        `translate(${xScale(minIndex)},${yScale(minDataPoint)})`
      );

    const maxPoint = minMaxPointG
      .append("circle")
      .attr("r", 3)
      .attr("fill", "red")
      .attr("class", "maxPoint")
      .attr(
        "transform",
        `translate(${xScale(maxIndex)},${yScale(maxDataPoint)})`
      );

    // draw overlay for zoom and tooltip
    const overlay = g
      .append("rect")
      .attr("class", "overlay")
      .attr("x", -minTickSpace)
      .attr("width", width + minTickSpace)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all");

    // draw tooltip
    const tooltip = g
      .append("g")
      .append("text")
      .attr("class", "tooltip")
      .attr("display", "none");

    // draw focus line and point
    const focus = g
      .append("g")
      .attr("class", "focus")
      .attr("clip-path", "url(#clip)")
      .attr("display", "none");

    const focusLine = focus
      .append("line")
      .attr("stroke", "cadetblue")
      .attr("stroke-width", "2")
      .attr("y1", 0)
      .attr("y2", height)
      .attr("class", "focusLine");

    const focusPoint = focus
      .append("circle")
      .attr("r", 3)
      .attr("class", "focusPoint");

    const mousemove = (event) => {
      const currentXScale = newXScale || xScale;
      const currentYScale = newYScale || yScale;

      const index = Math.round(xScale.invert(event.clientX - margin.left));
      const value = data[index];

      if (!value) {
        return;
      }

      focus.attr("display", "block");

      focusLine.attr("transform", `translate(${currentXScale(index)},0)`);

      focusPoint.attr(
        "transform",
        `translate(${currentXScale(index)},${currentYScale(value)})`
      );

      minMaxPointG.attr("display", "block");

      minPoint.attr(
        "transform",
        `translate(${currentXScale(minIndex)},${currentYScale(minDataPoint)})`
      );

      maxPoint.attr(
        "transform",
        `translate(${currentXScale(maxIndex)},${currentYScale(maxDataPoint)})`
      );

      tooltip.attr("display", "block").text(`(${index}, ${value})`);

      if (width - event.clientX - margin.left < 80) {
        tooltip.style(
          "transform",
          `translate(${currentXScale(index) - 200}px,${
            currentYScale(value) - 30
          }px)`
        );
      } else {
        tooltip.style(
          "transform",
          `translate(${currentXScale(index) + 15}px,${
            currentYScale(value) - 30
          }px)`
        );
      }
    };

    overlay.on("mousemove", mousemove).on("mouseout");

    // zoom functionality
    const onZoom = (event) => {
      // hide focus and tooltip
      focus.attr("display", "none");
      tooltip.attr("display", "none");
      minMaxPointG.attr("display", "none");

      newXScale = event.transform.rescaleX(xScale);
      newYScale = event.transform.rescaleY(yScale);

      gX.call(xAxis.scale(newXScale));
      gY.call(yAxis.scale(newYScale));

      // update line
      line.attr("transform", event.transform);
    };

    const zoom = d3.zoom().scaleExtent([1, 1.2]).on("zoom", onZoom);

    overlay.call(zoom);
  };

  useEffect(() => drawChart(), [data, isZoom]);

  return (
    <>
      <h1>{title}</h1>
      <div className={className} />
      <button onClick={() => setIsZoom(!isZoom)}>Magnify</button>
      <p>Min data point: {minDataPoint}</p>
      <p>Max data point: {maxDataPoint}</p>
      <p>Average data point: {avgDataPoint}</p>
      <p>Standard deviation: {standardDeviation}</p>
    </>
  );
};

export default LineChart;
