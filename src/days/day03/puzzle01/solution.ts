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

export const main = (): number => {
  const fileData = readFile("input.txt");

  console.log("The final sum is: "); //

  return 0;
};

main();
