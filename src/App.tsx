import React from "react";
import LineChart from "./components/LineChart";
import response from "./response.json";
import dataSanitizer from "./dataSanitizer";

function App() {
  const { filteredData1, filteredData2 } = dataSanitizer(response);

  return (
    <div className="App">
      <h1>Profile Measurement Visualization App</h1>
      <LineChart
        title="Data set I"
        className="containerI"
        data={filteredData1}
      />
      <LineChart
        title="Data set II"
        className="containerII"
        data={filteredData2}
      />
    </div>
  );
}

export default App;
