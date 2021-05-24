import React from "react";
import {
  calcAverage,
  calcStandardDeviation,
  findMax,
  findMin,
} from "../../utils/statsCalculator";

const Stats = ({ data }): JSX.Element => {
  const { min } = findMin(data);
  const { max } = findMax(data);
  const avgDataPoint = calcAverage(data);
  const standardDeviation = calcStandardDeviation(data);

  return (
    <div className="analysis-text">
      <p>
        <span className="label">Min</span>: {min}
      </p>
      <p>
        <span className="label">Max</span>: {max}
      </p>
      <p>
        <span className="label">Average</span>: {avgDataPoint}
      </p>
      <p>
        <span className="label">Standard deviation</span>: {standardDeviation}
      </p>
    </div>
  );
};

export default Stats;
