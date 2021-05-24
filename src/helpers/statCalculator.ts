const calcSum = (data): number => {
  return data.reduce((acc, element) => acc + element, 0);
};

export const calcAverage = (data): number => {
  const sum = calcSum(data);
  return sum / data.length;
};

export const calcStandardDeviation = (data, avgValue: number): number => {
  const pwOfElementMinusAvg = data.map((element) =>
    Math.pow(element - avgValue, 2)
  );
  return Math.sqrt(calcSum(pwOfElementMinusAvg) / pwOfElementMinusAvg.length);
};

export const calcMin = (data): { min: number; indexOfMin: number } => {
  const min = Math.min(...data);
  const indexOfMin = data.indexOf(min);

  return { min, indexOfMin };
};

export const calcMax = (data): { max: number; indexOfMax: number } => {
  const max = Math.max(...data);
  const indexOfMax = data.indexOf(max);

  return { max, indexOfMax };
};
