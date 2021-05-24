import { parseAndSanitizeData } from "../dataSanitizer";

const mockDataSet = {
  data1: {
    value: {
      elem: [
        { f: 0, a: 1 },
        { f: -1, a: 2 },
        { f: 0, a: 3 },
        { f: 19, a: 4 },
        { f: 3, a: 5 },
      ],
    },
  },
  data2: {
    value: {
      elem: [
        { f: 0, a: 11 },
        { f: -2, a: 21 },
        { f: 1, a: 31 },
        { f: 0, a: 41 },
        { f: 0, a: 51 },
      ],
    },
  },
};

describe("parse and sanitize data correctly", () => {
  it("should parse response data and filter fault flag", () => {
    const result = parseAndSanitizeData(mockDataSet);
    const expectedResult = [
      [1, 3],
      [11, 41, 51],
    ];

    expect(result).toEqual(expectedResult);
  });
});
