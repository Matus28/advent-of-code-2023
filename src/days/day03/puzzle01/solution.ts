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

const replaceSpecialCharWithStars = (input: string): string => {
  return input.replace(/[^\w\s\.]/g, "*");
};

type NumPosition = {
      value: string;
      position: number;
}

const calculateSum = (input: string): number => {
  const allLines = input.split(/\r?\n/g);

  let sum: number = 0;

  for(let i:number = 0; i < allLines.length; i++) {) { 

    let numStr: NumPosition[] = [];
    let num: number = 0;

    for(let j = 0; j < allLines[i].length; j++) {
      if(allLines[i][j] !== "*") {
        numStr.push({value: allLines[i][j], position: j});
      } else if (numStr === "*" || numStr === "\n" || numStr === "\n") {

      }

    }

  })

  return 0;
}


export const main = (): number => {
  const fileData = readFile("input.txt");
  const dataStars = replaceSpecialCharWithStars(fileData);
  const finalSum = calculateSum(dataStars);

  console.log(dataStars);
  console.log("The final sum is: "); //

  return 0;
};

main();
