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

  // separate the rucksacks into groups of 3
  const rucksackGroups = rucksacks.reduce((acc, rucksack, index) => {
    const groupIndex = Math.floor(index / 3)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push(rucksack)
    return acc
  }, [] as string[][])

  // for each group of 3 rucksacks, find the letter that repeats in all 3
  const repeatedLetters = rucksackGroups.map((rucksackGroup) => {
    const [firstRucksack, secondRucksack, thirdRucksack] = rucksackGroup

    const firstRucksackLetters = firstRucksack.split("")
    const secondRucksackLetters = secondRucksack.split("")
    const thirdRucksackLetters = thirdRucksack.split("")
    const repeatedLetters = firstRucksackLetters
      .filter((letter) => secondRucksackLetters.includes(letter))
      .filter((letter) => thirdRucksackLetters.includes(letter))

    if (repeatedLetters.length === 0) {
      throw new Error("No letter appears on all 3 rucksacks")
    }

    return repeatedLetters[0]
  })

  console.log(repeatedLetters)

  // calculate the score for each repeated letter
  const scores = repeatedLetters.map((letter) => alphabetMap.get(letter))

  const totalScore = scores.reduce((acc, score) => acc + score, 0)

  console.log(totalScore)
}

main()
