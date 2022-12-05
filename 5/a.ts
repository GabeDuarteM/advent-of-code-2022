import { promises as fs } from "fs"

export async function main() {
  const stacksInput = await fs.readFile("5/stacks.txt", "utf8")
  const instructionsInput = await fs.readFile(
    "5/instructions.txt",
    "utf8"
  )

  const stacks = stacksInput
    .trim()
    .split("\n")
    .map((line) => {
      const regex = /\[(..*?)\]/g

      const stack = []

      let match: RegExpExecArray | null
      while ((match = regex.exec(line)) !== null) {
        stack.push(match[1])
      }

      return stack.reverse()
    })

  const instructions = instructionsInput
    .trim()
    .split("\n")
    .map((line) => {
      const regex = /move (\d+) from (\d+) to (\d+)/g

      let instruction: { from: number; to: number; move: number } | null

      let match: RegExpExecArray | null
      while ((match = regex.exec(line)) !== null) {
        instruction = {
          move: parseInt(match[1]),
          from: parseInt(match[2]),
          to: parseInt(match[3]),
        }
      }

      if (!instruction) {
        throw new Error("Invalid instruction")
      }

      return instruction
    })

  const finalStacks = instructions.reduce((stacks, instruction) => {
    const { move, from, to } = instruction

    const fromStack = stacks[from - 1]
    const toStack = stacks[to - 1]

    if (fromStack.length < move) {
      throw new Error("Invalid move")
    }

    const moved = fromStack.splice(fromStack.length - move, move)

    toStack.push(...moved.reverse())

    return stacks
  }, stacks)

  const eachTopFromStack = finalStacks.map((stack) => stack[stack.length - 1]).join("")

  console.log(eachTopFromStack)
}

main()
