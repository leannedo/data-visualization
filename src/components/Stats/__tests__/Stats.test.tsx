import React from "react";
import { render, screen } from "@testing-library/react";
import Stats from "../index";

describe("<Stats />", () => {
  const mockData = [1, 2, 3, 4, 5, 6, 7];

  test("it should render correctly without error", () => {
    render(<Stats data={mockData} />);
  });

  test("it should render calculated statistics", () => {
    render(<Stats data={mockData} />);

    expect(getByTextWithMarkup("Min: 1")).toBeInTheDocument();
    expect(getByTextWithMarkup("Max: 7")).toBeInTheDocument();
    expect(getByTextWithMarkup("Average: 4")).toBeInTheDocument();
    expect(getByTextWithMarkup("Standard deviation: 2")).toBeInTheDocument();
  });
});

const getByTextWithMarkup = (text: string) => {
  return screen.getByText((content, node) => {
    const hasText = (node: Element) => node.textContent === text;
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child as HTMLElement)
    );
    return hasText(node) && childrenDontHaveText;
  });
};
