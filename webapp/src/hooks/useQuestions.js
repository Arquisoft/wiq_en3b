import { useCallback, useEffect, useState } from 'react'
import { getQuestions } from '../services/apiQuestions'
import { shuffle } from '../utils/shuffle'

const useQuestions = ({ numberOfQuestions, language }) => {
  const [questions, setQuestions] = useState([])

  const generateNewQuestions = useCallback(async () => {
    setQuestions([])
    const questions = await getQuestions(numberOfQuestions, language)

    questions.forEach((question, i) => {
      question.id = i
      question.answers = shuffle(question.answers)
    })

    setQuestions(questions)
  }, [language, numberOfQuestions])

  const addMoreQuestions = useCallback(
    async ({ amount }) => {
      const newQuestions = await getQuestions(amount, language)

      newQuestions.forEach((question, i) => {
        question.id = questions.length + i
        question.answers = shuffle(question.answers)
      })

      setQuestions(questions.concat(newQuestions))
    },
    [language, questions]
  )

  useEffect(() => {
    generateNewQuestions()
  }, [generateNewQuestions])

  return { questions, generateNewQuestions, addMoreQuestions }
}

export { useQuestions }
