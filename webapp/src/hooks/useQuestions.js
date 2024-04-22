import { useCallback, useEffect, useState } from 'react'
import { getQuestions } from '../services/apiQuestions'
import { shuffle } from '../utils/shuffle'

const useQuestions = ({ numberOfQuestions, language, questionTypes }) => {
  const [questions, setQuestions] = useState([])

  const generateNewQuestions = useCallback(async () => {
    const questions = await getQuestions(
      numberOfQuestions,
      language,
      questionTypes
    )

    questions.forEach((question, i) => {
      question.id = i
      question.answers = shuffle(question.answers)
    })

    setQuestions(questions)
  }, [language, numberOfQuestions, questionTypes])

  const addMoreQuestions = useCallback(
    async ({ amount }) => {
      const newQuestions = await getQuestions(amount, language, questionTypes)

      newQuestions.forEach((question, i) => {
        question.id = questions.length + i
        question.answers = shuffle(question.answers)
      })

      setQuestions(questions.concat(newQuestions))
    },
    [language, questions, questionTypes]
  )

  useEffect(() => {
    generateNewQuestions()
  }, [])

  return { questions, generateNewQuestions, addMoreQuestions }
}

export { useQuestions }
