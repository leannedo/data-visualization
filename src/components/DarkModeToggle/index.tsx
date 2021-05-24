import React from "react";
import "./DarkModeToggle.scss";

const DarkModeToggle = () => {
  return (
    <>
      <input type="checkbox" id="toggle-dark-mode-cb" />
      <div className="toggle-dark-mode-wrapper">
        <label className="toggle-dark-mode" htmlFor="toggle-dark-mode-cb">
          <span className="toggle-border">
            <span className="toggle-indicator" />
          </span>
        </label>
      </div>
    </>
  );
};

export default DarkModeToggle;
