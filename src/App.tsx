import React from "react";

import "./App.scss";
import "./styles/variables.scss";

import Dashboard from "./views/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";

function App(): JSX.Element {
  return (
    <>
      <DarkModeToggle />
      <div className="app">
        <header className="header">
          <div className="logo" />
          <h1 className="page-title">Profile Measurement Visualization App</h1>
        </header>
        <Dashboard />
      </div>
    </>
  );
}

export default App;
