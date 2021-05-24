import React from "react";
import "./Switch.scss";

const Switch = ({ name, onSwitch = (f) => f }) => {
  return (
    <div className="switch-wrapper">
      <input
        type="checkbox"
        className="switch-checkbox"
        id={`switch-cb-${name}`}
        onChange={onSwitch}
      />
      <label className="switch-slider" htmlFor={`switch-cb-${name}`} />
    </div>
  );
};

export default Switch;
