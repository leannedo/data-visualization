import React from "react";
import LineChart from "../../components/LineChart";
import response from "../../response.json";
import { parseAndSanitizeData } from "../../utils/dataSanitizer";

const Dashboard = (): JSX.Element => {
  const data = parseAndSanitizeData(response);

  return (
    <div className="dashboard">
      {data &&
        data.map((dataSet, i) => (
          <LineChart
            key={i}
            title={`Data set ${i}`}
            className={`container-${i}`}
            data={dataSet}
          />
        ))}
    </div>
  );
};

export default Dashboard;
