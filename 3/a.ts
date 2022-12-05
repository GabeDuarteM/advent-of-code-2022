import { promises as fs } from "fs"

export async function main() {
  const input = await fs.readFile("3/input.txt", "utf8")

  const rucksacks = input.trim().split("\n")

  // assign numbers for each letters of the alphabet, from 1 to 52
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    ""
  )
  const alphabetMap = new Map<string, number>()
  alphabet.forEach((letter, index) => alphabetMap.set(letter, index + 1))

  // calculate the score for each rucksack
  const scores = rucksacks.map((rucksack) => {
    const rucksackLength = rucksack.length
    const leftCompartment = rucksack.slice(0, rucksackLength / 2)
    const rightCompartment = rucksack.slice(rucksackLength / 2)

    const [letterAppearingOnBothSides] = leftCompartment
      .split("")
      .filter((letter) => rightCompartment.includes(letter))

    if (!letterAppearingOnBothSides) {
      throw new Error("No letter appears on both sides")
    }

    return alphabetMap.get(letterAppearingOnBothSides)
  })

  const totalScore = scores.reduce((acc, score) => acc + score, 0)

  console.log(totalScore)
}

main()
