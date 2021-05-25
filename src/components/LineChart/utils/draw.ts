import * as d3 from "d3";
import { findMax, findMin } from "../../../utils/statsCalculator";

export const getXScale = (data: number[], width: number) => {
  return d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);
};

export const getYScale = ({
  data,
  height,
  offset = 20,
  isMagnified,
}: {
  data: number[];
  height: number;
  offset?: number;
  isMagnified: boolean;
}) => {
  const { min } = findMin(data);
  const { max } = findMax(data);

  return d3
    .scaleLinear()
    .domain([isMagnified ? min - offset : 0, max + offset])
    .range([height, 0]);
};

export const axesFnGenerator = ({
  xScale,
  yScale,
  width,
  height,
  minTickSpace,
}: {
  xScale: Function;
  yScale: Function;
  width: number;
  height: number;
  minTickSpace: number;
}) => {
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / minTickSpace)
    .tickSize(0);

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(height / minTickSpace)
    .tickSize(0);

  return { xAxis, yAxis };
};

export const drawAxes = ({
  container,
  xAxis,
  yAxis,
  height,
}: {
  container;
  xAxis: Function;
  yAxis: Function;
  height: number;
}) => {
  const xAxisGroup = container
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  const yAxisGroup = container.append("g").attr("class", "yAxis").call(yAxis);

  return { xAxisGroup, yAxisGroup };
};

export const drawLine = ({
  data,
  container,
  xScale,
  yScale,
}: {
  data: number[];
  container;
  xScale: Function;
  yScale: Function;
}) => {
  const lineDrawer = d3
    .line()
    .x((value, i) => xScale(i))
    .y(yScale);

  return container
    .append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .attr("class", "line")
    .attr("d", lineDrawer(data));
};

export const drawClipPath = ({
  container,
  width,
  height,
}: {
  container;
  width: number;
  height: number;
}) => {
  container
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);
};

export const drawGrids = ({
  container,
  xScale,
  yScale,
  width,
  height,
}: {
  container;
  xScale: Function;
  yScale: Function;
  width: number;
  height: number;
}) => {
  container
    .append("g")
    .attr("class", "gridX")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(width / 100)
        .tickSize(-height)
        .tickFormat("")
    );

  container
    .append("g")
    .attr("class", "gridY")
    .call(
      d3
        .axisLeft(yScale)
        .ticks(height / 50)
        .tickSize(-width)
        .tickFormat("")
    );
};

export const drawOverlay = ({
  container,
  width,
  height,
  minTickSpace,
}: {
  container;
  width: number;
  height: number;
  minTickSpace: number;
}) =>
  container
    .append("rect")
    .attr("class", "overlay")
    .attr("x", -minTickSpace)
    .attr("width", width + minTickSpace)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

export const drawHighlightPoints = ({
  container,
  data,
  xScale,
  yScale,
}: {
  container;
  data: number[];
  xScale: Function;
  yScale: Function;
}) => {
  const { min, index: minIndex } = findMin(data);
  const { max, index: maxIndex } = findMax(data);

  const minMaxGroup = container.append("g");
  const minPoint = minMaxGroup
    .append("circle")
    .attr("r", 4)
    .attr("class", "minPoint")
    .attr("transform", `translate(${xScale(minIndex)},${yScale(min)})`);

  const maxPoint = minMaxGroup
    .append("circle")
    .attr("r", 4)
    .attr("class", "maxPoint")
    .attr("transform", `translate(${xScale(maxIndex)},${yScale(max)})`);

  return { minPoint, maxPoint, minMaxGroup };
};

export const drawFocusElements = (container, height: number) => {
  const focus = container
    .append("g")
    .attr("class", "focus")
    .attr("clip-path", "url(#clip)")
    .attr("display", "none");

  const focusLine = focus
    .append("line")
    .attr("y1", 0)
    .attr("y2", height)
    .attr("class", "focusLine");

  const focusPoint = focus
    .append("circle")
    .attr("r", 4)
    .attr("class", "focusPoint");

  return { focus, focusLine, focusPoint };
};

export const drawTooltip = (container) =>
  container
    .append("g")
    .append("text")
    .attr("class", "tooltip")
    .attr("display", "none");
