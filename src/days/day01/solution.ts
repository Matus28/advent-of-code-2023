import { readFileSync } from "fs";
import path from "path";

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

const processData = (data: string): number => {
  let result: number = 0;
  const dataArr = data.split(/\r?\n/);

  const numbers = dataArr.map((line: string): number => {
    const numInLine = line.match(/\d/g);
    if (numInLine && numInLine?.length === 1) {
      return parseInt(numInLine[0]) * 10 + parseInt(numInLine[0]);
    } else if (numInLine && numInLine?.length > 1) {
      return (
        parseInt(numInLine[0]) * 10 + parseInt(numInLine[numInLine.length - 1])
      );
    }
    return 0;
  });

  numbers.forEach((num: number) => {
    result += num;
  });

  return result;
};

const main = (): void => {
  const fileData = readFile("input.txt");
  const sum = processData(fileData);

  console.log(sum); // 54968
};

main();
