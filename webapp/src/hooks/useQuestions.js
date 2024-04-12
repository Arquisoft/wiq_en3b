import { useCallback, useEffect, useState } from 'react'
import { getQuestions } from '../services/apiQuestions'
import { shuffle } from '../utils/shuffle'

const useQuestions = ({ numberOfQuestions, language }) => {
  const [questions, setQuestions] = useState([])

  const generateNewQuestions = useCallback(async () => {
    const questions = await getQuestions(numberOfQuestions, language)

    questions.forEach((question, i) => {
      question.id = i
      question.answers = shuffle(question.answers)
    })

    setQuestions(questions)
  }, [language, numberOfQuestions])

  useEffect(() => {
    generateNewQuestions()
  }, [generateNewQuestions])

  return { questions, generateNewQuestions }
}

export { useQuestions }
