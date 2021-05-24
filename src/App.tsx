import React from "react";

import "./App.scss";
import "./styles/variables.scss";

import Dashboard from "./views/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <div>
      <DarkModeToggle />
      <div className="app">
        <header className="header">
          <h1 className="page-title">Profile Measurement Visualization App</h1>
        </header>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
