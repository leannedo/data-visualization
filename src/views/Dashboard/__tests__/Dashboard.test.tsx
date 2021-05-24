import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "../index";

describe("<Dashboard/>", () => {
  test("render correctly", () => {
    render(<Dashboard />);
  });
});
