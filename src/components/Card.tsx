import React from "react";
import "./Card.scss";

const Card = ({ children }) => {
  return <div className="dashboard-card">{children}</div>;
};

export default Card;
