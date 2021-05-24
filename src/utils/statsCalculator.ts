export const calcSum = (data: number[]): number => {
  return data.reduce((acc, element) => acc + element, 0);
};

export const calcAverage = (data: number[]): number => {
  const sum = calcSum(data);
  return sum / data.length;
};

export const calcStandardDeviation = (data: number[]): number => {
  const avg = calcAverage(data);
  const pwOfElementMinusAvg = data.map((element) => Math.pow(element - avg, 2));
  return Math.sqrt(calcSum(pwOfElementMinusAvg) / pwOfElementMinusAvg.length);
};

export const findMin = (data: number[]): { min: number; index: number } => {
  const min = Math.min(...data);

  return { min, index: data.indexOf(min) };
};

export const findMax = (data): { max: number; index: number } => {
  const max = Math.max(...data);

  return { max, index: data.indexOf(max) };
};
