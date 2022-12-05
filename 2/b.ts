import { promises as fs } from "fs"

const oponentMovesMap: { [key: string]: string } = {
  A: "rock",
  B: "paper",
  C: "scissors",
}

const desiredOutcomeMap: { [key: string]: string } = {
  X: "lose",
  Y: "draw",
  Z: "win",
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
    const [oponentMove, desiredOutcome] = move.split(" ")

    const oponentMoveName: string = oponentMovesMap[oponentMove]
    const desiredOutcomeName: string = desiredOutcomeMap[desiredOutcome]

    switch (desiredOutcomeName) {
      case "win": {
        const myWinMove: string = winTable[oponentMoveName]
        return acc + scoreByShape[myWinMove] + scoreByResult["win"]
      }
      case "draw": {
        return acc + scoreByShape[oponentMoveName] + scoreByResult["draw"]
      }
      case "lose": {
        const myLoseMove: string = winTable[winTable[oponentMoveName]]
        return acc + scoreByShape[myLoseMove] + scoreByResult["loss"]
      }
    }

    return (
      acc + scoreByShape[oponentMoveName] + scoreByResult[desiredOutcomeName]
    )
  }, 0)

  console.log(score)
}

main()
