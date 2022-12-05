import { promises as fs } from "fs"

const oponentMovesMap: { [key: string]: string } = {
  A: "rock",
  B: "paper",
  C: "scissors",
}

const myMovesMap: { [key: string]: string } = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
}

const winTable: { [key: string]: string } = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
}

const scoreByShape: { [key: string]: number } = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const scoreByResult: { [key: string]: number } = {
  win: 6,
  draw: 3,
  loss: 0,
}

export async function main() {
  // read the input.txt file
  const input = await fs.readFile("2/input.txt", "utf8")
  const moves = input.trim().split("\n")

  const score = moves.reduce((acc, move) => {
    const [oponentMove, myMove] = move.split(" ")

    const oponentMoveName: string = oponentMovesMap[oponentMove]
    const myMoveName: string = myMovesMap[myMove]

    const winMove: string = winTable[oponentMoveName]

    let points = 0

    // calculate the score for the shape
    points += scoreByShape[myMoveName]

    // calculate the score for the result
    if (myMoveName === winMove) {
      points += scoreByResult["win"]
    } else if (myMoveName === oponentMoveName) {
      points += scoreByResult["draw"]
    } else {
      points += scoreByResult["loss"]
    }

    return acc + points
  }, 0)

  console.log(score)
}

main()
