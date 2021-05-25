import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../index";

describe("<Dashboard/>", () => {
  test("it should render correctly without error", () => {
    render(<Dashboard />);
  });

  test("it should render 2 charts", () => {
    render(<Dashboard />);

    expect(screen.getByText(/data set 1/i)).toBeInTheDocument();
    expect(screen.getByText(/data set 2/i)).toBeInTheDocument();
  });
});
