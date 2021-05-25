import { findMax, findMin } from "../../../utils/statsCalculator";

export const onMouseMove = ({ event, data, scales, elements, dimensions }) => {
  const { xScale } = scales;
  const { width, margin } = dimensions;
  const mousePos = event.offsetX - margin.left;

  const pointIndex = Math.round(xScale.invert(mousePos));
  const pointValue = data[pointIndex];

  if (!pointValue) {
    return;
  }

  transformFocusElements({ elements, scales, pointIndex, pointValue });
  transformHighlightPoints({ data, elements, scales });
  transformTooltip({
    elements,
    scales,
    width,
    mousePos,
    pointIndex,
    pointValue,
  });
};

const transformFocusElements = ({
  elements,
  scales,
  pointIndex,
  pointValue,
}) => {
  const { xScale, yScale } = scales;
  const { focus, focusLine, focusPoint } = elements;

  focus.attr("display", "block");
  focusLine.attr("transform", `translate(${xScale(pointIndex)},0)`);
  focusPoint.attr(
    "transform",
    `translate(${xScale(pointIndex)},${yScale(pointValue)})`
  );
};

const transformHighlightPoints = ({ data, elements, scales }) => {
  const { xScale, yScale } = scales;
  const { minMaxGroup, minPoint, maxPoint } = elements;

  const { min, index: minIndex } = findMin(data);
  const { max, index: maxIndex } = findMax(data);

  minMaxGroup.attr("display", "block");
  minPoint.attr("transform", `translate(${xScale(minIndex)},${yScale(min)})`);
  maxPoint.attr("transform", `translate(${xScale(maxIndex)},${yScale(max)})`);
};

const transformTooltip = ({
  elements,
  scales,
  width,
  mousePos,
  pointIndex,
  pointValue,
}) => {
  const { xScale, yScale } = scales;
  const { tooltip } = elements;

  tooltip.attr("display", "block").text(`(${pointIndex}, ${pointValue})`);

  // re-position tooltip text to the left when near the end
  if (width - mousePos < 80) {
    tooltip.style(
      "transform",
      `translate(${xScale(pointIndex) - 200}px,${yScale(pointValue) - 30}px)`
    );
  } else {
    tooltip.style(
      "transform",
      `translate(${xScale(pointIndex) + 15}px,${yScale(pointValue) - 30}px)`
    );
  }
};
