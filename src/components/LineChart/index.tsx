// Libraries
import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

// Components
import Switch from "../Switch";
import Card from "../Card/";
import Stats from "../Stats";

// Styling
import "./LineChart.scss";

// Utils
import {
  getXScale,
  getYScale,
  axesFnGenerator,
  drawAxes,
  drawClipPath,
  drawFocusElements,
  drawGrids,
  drawOverlay,
  drawTooltip,
  drawLine,
  drawHighlightPoints,
} from "./utils/draw";
import { onZoom } from "./utils/zoom";
import { onMouseMove } from "./utils/mouseEvents";

interface LineChartProps {
  title: string;
  data;
  dimensions?: {
    width?: number;
    height?: number;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    minTickSpace: number;
  };
  className: string;
  minTickSpace?: number;
}

const LineChart = ({
  title,
  data,
  dimensions: { width, height, margin, minTickSpace } = {
    width: 550,
    height: 300,
    margin: { top: 30, right: 30, bottom: 20, left: 30 },
    minTickSpace: 30,
  },
  className,
}: LineChartProps): JSX.Element => {
  const [isMagnified, setIsMagnified] = useState(false);

  const svgRef = useRef(null);

  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  const drawChart = () => {
    const canvas = d3.select(svgRef.current);

    // Clear canvas
    canvas.selectAll("*").remove();

    // Add top level group
    const chartGroup = canvas
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales and axes
    const xScale = getXScale(data, width);
    const yScale = getYScale({ data, height, isMagnified });

    let updatedXScale = null;
    let updatedYScale = null;

    const { xAxis, yAxis } = axesFnGenerator({
      xScale,
      yScale,
      width,
      height,
      minTickSpace,
    });

    /* -------------- Draw chart elements -------------- */

    const { xAxisGroup, yAxisGroup } = drawAxes({
      container: chartGroup,
      xAxis,
      yAxis,
      height,
    });

    drawGrids({
      container: chartGroup,
      xScale,
      yScale,
      width,
      height,
    });

    const line = drawLine({ data, container: chartGroup, xScale, yScale });

    drawClipPath({
      container: chartGroup,
      width,
      height,
    });

    const { minPoint, maxPoint, minMaxGroup } = drawHighlightPoints({
      container: chartGroup,
      data,
      xScale,
      yScale,
    });

    const { focus, focusPoint, focusLine } = drawFocusElements(
      chartGroup,
      height
    );

    const tooltip = drawTooltip(chartGroup);

    const overlay = drawOverlay({
      container: chartGroup,
      width,
      height,
      minTickSpace,
    });

    // Attach mouse events
    overlay.on("mousemove", (event) =>
      onMouseMove({
        event,
        data,
        scales: {
          xScale: updatedXScale || xScale,
          yScale: updatedYScale || yScale,
        },
        elements: {
          focus,
          focusLine,
          focusPoint,
          minMaxGroup,
          minPoint,
          maxPoint,
          tooltip,
        },
        dimensions: { width, margin },
      })
    );

    // Zoom functionality
    const zoom = d3
      .zoom()
      .scaleExtent([1, 1.2])
      .on("zoom", (event) => {
        const { zoomedXScale, zoomedYScale } = onZoom({
          event,
          axes: { xAxis, yAxis, xAxisGroup, yAxisGroup },
          scales: { xScale, yScale },
          elements: {
            focus,
            tooltip,
            minMaxGroup,
            line,
          },
        });

        // update new scales after zoom
        updatedXScale = zoomedXScale;
        updatedYScale = zoomedYScale;
      });

    overlay.call(zoom);
  };

  useEffect(() => {
    drawChart();
  }, [data, isMagnified]);

  return (
    <Card>
      <div className="chart-header">
        <h2 className="chart-title">{title}</h2>
        <div className="switch-label-wrapper">
          <div className="switch-label">Magnify</div>
          <Switch
            name={title.split(" ").join("-")}
            onSwitch={() => setIsMagnified(!isMagnified)}
          />
        </div>
      </div>
      <div className="chart-container">
        <div className={`canvas-container ${className}`}>
          <svg
            className="canvas"
            ref={svgRef}
            width={svgWidth}
            height={svgHeight}
          />
        </div>
        <Stats data={data} />
      </div>
    </Card>
  );
};

export default LineChart;
