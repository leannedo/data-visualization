interface DataPoint {
  f: number;
  a: number;
}

type ResponseData = {
  [key: string]: { value: { elem: DataPoint[] } };
};

export const filterFlag = (data, flag): DataPoint[] => {
  return data.filter((element) => element[flag] === 0);
};

export const parseAndSanitizeData = (data: ResponseData) => {
  return Object.values(data)
    .map((data) => data.value.elem)
    .map((data) => filterFlag(data, "f"))
    .map((data) => data.map((el) => el.a));
};
