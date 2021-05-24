import {
  calcSum,
  findMin,
  findMax,
  calcAverage,
  calcStandardDeviation,
} from "../statsCalculator";

const mockData = [1, 2, 3, 4, 5, 6, 7];

describe("calcSum", () => {
  it("should return the sum of an array of numbers", () => {
    expect(calcSum(mockData)).toBe(28);
  });
});

describe("findMin", () => {
  it("should return min in an array of numbers and its index", () => {
    expect(findMin(mockData)).toEqual({
      min: 1,
      index: 0,
    });
  });
});

describe("calcMax", () => {
  it("should return max in an array of numbers and its index", () => {
    expect(findMax(mockData)).toEqual({
      max: 7,
      index: 6,
    });
  });
});

describe("calcAverage", () => {
  it("should return average of an array of numbers", () => {
    expect(calcAverage(mockData)).toBe(4);
  });
});

describe("calcStandardDeviation", () => {
  it("should return standard deviation of an array of numbers", () => {
    expect(calcStandardDeviation(mockData)).toBe(2);
  });
});
