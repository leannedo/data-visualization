export const onZoom = ({ event, scales, axes, elements }) => {
  const { focus, tooltip, minMaxGroup, line } = elements;
  const { xScale, yScale } = scales;
  const { xAxis, yAxis, xAxisGroup, yAxisGroup } = axes;

  // hide focus and tooltip
  focus.attr("display", "none");
  tooltip.attr("display", "none");
  minMaxGroup.attr("display", "none");

  const zoomedXScale = event.transform.rescaleX(xScale);
  const zoomedYScale = event.transform.rescaleY(yScale);

  xAxisGroup.call(xAxis.scale(zoomedXScale));
  yAxisGroup.call(yAxis.scale(zoomedYScale));

  // update line
  line.attr("transform", event.transform);

  return { zoomedXScale, zoomedYScale };
};
