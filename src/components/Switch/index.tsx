import React from "react";
import "./Switch.scss";

interface SwitchProps {
  name: string;
  onSwitch: () => void;
}

const Switch = ({ name, onSwitch }: SwitchProps): JSX.Element => {
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
