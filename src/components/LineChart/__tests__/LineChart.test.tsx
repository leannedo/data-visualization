import React from "react";
import { render } from "@testing-library/react";
import LineChart from "../index";

describe("<LineChart/>", () => {
  const mockData = [2, 1.5, 9, 1.1, 4, 11.3, 15];
  const props = {
    title: "Test Chart",
    data: mockData,
    className: "testContainer",
  };

  test("it should render path with proper d attribute", () => {
    const { container } = render(
      <LineChart
        title={props.title}
        data={props.data}
        className={props.className}
      />
    );
    const path = container.querySelector("path");

    expect(path.getAttribute("d")).not.toMatch(
      /[^MmLlHhVvCcSsQqTtAaZz\.\,\s\d]/gi
    );
    expect(path.getAttribute("d")).not.toMatch(/NaN|undefined/);
    expect(path.getAttribute("d")).not.toBe("");
  });
});
