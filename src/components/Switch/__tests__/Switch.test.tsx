import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Switch from "../index";

describe("<Switch/>", () => {
  const switchCb = jest.fn();

  test("trigger magnifying on switch", () => {
    render(<Switch name="test" onSwitch={switchCb} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(switchCb).toHaveBeenCalledTimes(1);
  });
});
