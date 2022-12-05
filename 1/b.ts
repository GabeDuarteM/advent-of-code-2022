import { promises as fs } from "fs"

export async function main() {
  // read the input.txt file
  const input = await fs.readFile("1/input.txt", "utf8")
  // trim to remove the last newline and split by double newlines groups
  const groups = input.trim().split("\n\n")
  const sumPerGroup = groups.map((group) => {
    // split by newlines to get the individual answers and convert them to numbers
    const answers = group.split("\n").map((answer) => parseInt(answer, 10))
    console.log(group, answers)
    const sumOfAnswers = answers.reduce((a, b) => a + b, 0)

    return sumOfAnswers
  })

  const topThree = sumPerGroup.sort((a, b) => b - a).slice(0, 3)
  const topThreeSum = topThree.reduce((a, b) => a + b, 0)

  console.log(topThreeSum)
}

main()
