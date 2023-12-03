import { readFileSync } from "fs";
import path from "path";

const numbersStr = [
  { label: "one", value: 1 },
  { label: "two", value: 2 },
  { label: "three", value: 3 },
  { label: "four", value: 4 },
  { label: "five", value: 5 },
  { label: "six", value: 6 },
  { label: "seven", value: 7 },
  { label: "eight", value: 8 },
  { label: "nine", value: 9 },
];

const readFile = (filename: string): string => {
  const filePath = path.join(__dirname, filename);
  let content: string = "";

  try {
    content = readFileSync(filePath, { encoding: "utf-8" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Something went wrong, file ${filename} couldn't be read!`);
  }

  return content;
};

const checkForNumber = (str: string, type: "first" | "second"): number => {
  if (isNaN(parseInt(str.charAt(type === "first" ? 0 : str.length - 1), 10))) {
    const arr = str.split(/\d/g);
    const index = type === "first" ? 0 : arr[arr.length - 1].length - 1;
    let part: string = "";

    if (type === "first") {
      for (let i: number = 0; i < arr[0].length; i++) {
        part += arr[0][i];
        for (let j: number = 0; j < numbersStr.length; j++) {
          if (part.includes(numbersStr[j].label)) {
            return numbersStr[j].value;
          }
        }
      }
    } else if (type === "second") {
      for (let i: number = index; i >= 0; i--) {
        part = arr[arr.length - 1][i] + part;
        for (let j: number = 0; j < numbersStr.length; j++) {
          if (part.includes(numbersStr[j].label)) {
            return numbersStr[j].value;
          }
        }
      }
    }

    const numbers = str.match(/\d/g);

    return numbers
      ? parseInt(type === "first" ? numbers[0] : numbers[numbers.length - 1])
      : 0;
  }

  return parseInt(
    type === "first" ? str.charAt(0) : str.charAt(str.length - 1)
  );
};

const processData = (data: string): number => {
  const dataArr = data.split(/\r?\n/);

  const numbers = dataArr.map((line: string): number => {
    const firstNum = checkForNumber(line, "first");
    const secondNum = checkForNumber(line, "second");

    console.log(`${line}: ${firstNum * 10 + secondNum}`);
    return firstNum * 10 + secondNum;
  });

  return numbers.reduce((acc: number, curr: number) => acc + curr, 0);
};

export const main = (): number => {
  const fileData = readFile("input.txt");
  const sum = processData(fileData);

  console.log("The new Calibration value is: ", sum); // 54968
  return sum;
};

main();
