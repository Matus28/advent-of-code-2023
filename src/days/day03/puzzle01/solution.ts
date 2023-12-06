import { readFileSync } from "fs";
import path from "path";

type NumPosition = {
  value: string;
  position: {
    x: number;
    y: number;
  };
};

type CharPosition = {
  x: number;
  y: number;
};

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

const replaceSpecialCharWithStars = (input: string): string => {
  return input.replace(/[^\w\s\.]/g, "*");
};

const findSpecialCharPosition = (input: string[]): CharPosition[] => {
  const specialCharPositions: CharPosition[] = [];

  for (let i: number = 0; i < input.length; i++) {
    for (let j: number = 0; j < input[i].length; j++) {
      if (input[i][j] === "*") {
        specialCharPositions.push({ x: i, y: j });
      }
    }
  }

  return specialCharPositions;
};

const verifyHasSpecialCharNext = (
  numStr: NumPosition[],
  charPos: CharPosition[]
): boolean => {
  let hasSpecialCharNext: boolean = false;
  for (let i: number = 0; i < numStr.length; i++) {
    for (let j: number = 0; j < charPos.length; j++) {
      if (
        numStr[i].position.x - charPos[j].x <= 1 &&
        numStr[i].position.x - charPos[j].x >= -1 &&
        numStr[i].position.y - charPos[j].y <= 1 &&
        numStr[i].position.y - charPos[j].y >= -1
      ) {
        return true;
      }
    }
  }

  return hasSpecialCharNext;
};

const calculateSum = (allLines: string[], charPos: CharPosition[]): number => {
  let sum: number = 0;

  for (let i: number = 0; i < allLines.length; i++) {
    let numStr: NumPosition[] = [];

    for (let j = 0; j < allLines[i].length; j++) {
      if (
        allLines[i][j] === "1" ||
        allLines[i][j] === "2" ||
        allLines[i][j] === "3" ||
        allLines[i][j] === "4" ||
        allLines[i][j] === "5" ||
        allLines[i][j] === "6" ||
        allLines[i][j] === "7" ||
        allLines[i][j] === "8" ||
        allLines[i][j] === "9"
      ) {
        numStr.push({ value: allLines[i][j], position: { x: i, y: j } });
        if (j < allLines[i].length - 1) {
          continue;
        }
      }
      if (
        (numStr.length > 0 &&
          allLines[i][j] !== "1" &&
          allLines[i][j] !== "2" &&
          allLines[i][j] !== "3" &&
          allLines[i][j] !== "4" &&
          allLines[i][j] !== "5" &&
          allLines[i][j] !== "6" &&
          allLines[i][j] !== "7" &&
          allLines[i][j] !== "8" &&
          allLines[i][j] !== "9") ||
        (numStr.length > 0 && j === allLines[i].length - 1)
      ) {
        const isValid = verifyHasSpecialCharNext(numStr, charPos);
        if (isValid) {
          let numStrValid: string = "";
          for (let k: number = 0; k < numStr.length; k++) {
            numStrValid += numStr[k].value;
          }

          sum += parseInt(numStrValid);
        }
      }

      numStr = [];
    }
  }

  return sum;
};

export const main = (): number => {
  const fileData = readFile("input.txt");
  const dataStars = replaceSpecialCharWithStars(fileData);

  const linesArr = dataStars.split(/\r?\n/g);

  const specialCharPos = findSpecialCharPosition(linesArr); // const finalSum = calculateSum(dataStars);
  const finalSum = calculateSum(linesArr, specialCharPos);

  console.log("The final sum is: ", finalSum); // 560670

  return finalSum;
};

main();
