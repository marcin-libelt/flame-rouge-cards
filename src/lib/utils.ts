export const shuffle = (inputArray: number[]) => {
  for (let i = inputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
  }

  return inputArray;
};

export const getRandomInt = (max = 10) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const ucFirst = (inputString: string) => {
  if (!inputString) {
    return inputString;
  }

  return inputString[0].toUpperCase() + inputString.slice(1);
};
