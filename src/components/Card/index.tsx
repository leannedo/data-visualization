import React from "react";
import "./Card.scss";

const Card = ({ children }): JSX.Element => {
  return <div className="dashboard-card">{children}</div>;
};

export default Card;
