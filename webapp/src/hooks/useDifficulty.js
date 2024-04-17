import { useCallback, useState } from 'react'

const difficulties = {
  easy: {
    numberOfQuestions: 5,
    timePerQuestion: 30,
    pointsPerQuestion: 5,
  },
  medium: {
    numberOfQuestions: 10,
    timePerQuestion: 15,
    pointsPerQuestion: 15,
  },
  hard: {
    numberOfQuestions: 15,
    timePerQuestion: 5,
    pointsPerQuestion: 30,
  },
}

export function useDifficulty() {
  const [difficulty, setDifficulty] = useState(null)

  const switchDifficulty = useCallback(difficulty => {
    if (!(difficulty in difficulties)) {
      throw new Error('Unknown difficulty')
    }

    setDifficulty(difficulties[difficulty])
  }, [])

  return { difficulty, switchDifficulty }
}