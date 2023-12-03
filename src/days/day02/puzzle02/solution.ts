import { readFileSync } from "fs";
import path from "path";

type SubgameColors = {
  red: number;
  green: number;
  blue: number;
};

type Color = "red" | "green" | "blue";

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

const findMaxNumber = (data: SubgameColors[], color: Color): number => {
  const coloCount = data.map((subgameColor: SubgameColors) => {
    return subgameColor[color];
  });

  return Math.max(...coloCount) ?? 0;
};

const getGamesData = (str: string): any => {
  const arr = str.split(/\r?\n/g);
  let sum: number = 0;

  arr.forEach((line: string) => {
    const lineArr = line.split(":");

    const gameIdArr = lineArr[0].match(/\d+/);
    const gameId = gameIdArr ? parseInt(gameIdArr[0]) : 0;

    const subGames = lineArr[1].split(";");

    const subgamesColors = subGames.map((game: string) => {
      let requiredRedCubes = 0;
      let requiredGreenCubes = 0;
      let requiredBlueCubes = 0;

      const colorsArr = game.split(",");

      colorsArr.forEach((color: string) => {
        const num = color.match(/\d+/);

        if (num) {
          if (
            color.includes("red") &&
            (requiredRedCubes === 0 ||
              (requiredRedCubes !== 0 && requiredRedCubes < parseInt(num[0])))
          ) {
            requiredRedCubes = parseInt(num[0]);
          } else if (
            color.includes("green") &&
            (requiredGreenCubes === 0 ||
              (requiredGreenCubes !== 0 &&
                requiredGreenCubes < parseInt(num[0])))
          ) {
            requiredGreenCubes = parseInt(num[0]);
          } else if (
            color.includes("blue") &&
            (requiredBlueCubes === 0 ||
              (requiredBlueCubes !== 0 && requiredBlueCubes < parseInt(num[0])))
          ) {
            requiredBlueCubes = parseInt(num[0]);
          }
        }
      });

      return {
        red: requiredRedCubes,
        green: requiredGreenCubes,
        blue: requiredBlueCubes,
      };
    });

    const maxRed = findMaxNumber(subgamesColors, "red");
    const maxGreen = findMaxNumber(subgamesColors, "green");
    const maxBlue = findMaxNumber(subgamesColors, "blue");

    const power = maxRed * maxGreen * maxBlue;

    sum += power;
  });

  return sum;
};

export const main = (): number => {
  const fileData = readFile("input.txt");
  const finalSum = getGamesData(fileData);

  console.log("The sum of the IDs of possible games is: ", finalSum); // 65122

  return finalSum;
};

main();
