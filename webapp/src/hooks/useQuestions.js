import { useEffect, useState } from "react"
import { getQuestions } from "../services/apiQuestions"
import { shuffle } from "../utils/shuffle"

const useQuestions = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    ;(async () => {
      const questions = await getQuestions()

      questions.forEach(question => {
        question.answers = shuffle(question.answers)
      })

      setQuestions(questions)
    })()
  }, [])

  return { questions }
}

export { useQuestions }
