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

const getGamesData = (str: string): any => {
  const arr = str.split(/\r?\n/g);
  let sum: number = 0;

  const gamesData = arr.forEach((line: string) => {
    let isPossible: boolean = true;

    const lineArr = line.split(":");

    const gameIdArr = lineArr[0].match(/\d+/);
    const gameId = gameIdArr ? parseInt(gameIdArr[0]) : 0;

    const subGames = lineArr[1].split(";");

    const subgamesColors = subGames.map((game: string) => {
      let redCubes = 0;
      let greenCubes = 0;
      let blueCubes = 0;

      const colorsArr = game.split(",");

      colorsArr.forEach((color: string) => {
        const num = color.match(/\d+/);

        if (color.includes("red")) {
          redCubes = num ? redCubes + parseInt(num[0]) : redCubes;
        } else if (color.includes("green")) {
          greenCubes = num ? greenCubes + parseInt(num[0]) : greenCubes;
        } else if (color.includes("blue")) {
          blueCubes = num ? blueCubes + parseInt(num[0]) : blueCubes;
        }
      });

      return {
        red: redCubes,
        green: greenCubes,
        blue: blueCubes,
      };
    });

    for (let i: number = 0; i < subgamesColors.length; i++) {
      if (
        subgamesColors[i].blue > 14 ||
        subgamesColors[i].red > 12 ||
        subgamesColors[i].green > 13
      ) {
        isPossible = false;
        break;
      }
    }

    if (isPossible) sum += gameId;
  });

  return sum;
};

export const main = (): number => {
  const fileData = readFile("input.txt");
  const finalSum = getGamesData(fileData);

  console.log("The sum of the IDs of possible games is: ", finalSum); // 2879

  return finalSum;
};

main();
