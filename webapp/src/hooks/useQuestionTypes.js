import { useEffect, useState } from 'react'
import { getQuestionTypes } from '../services/apiQuestions'

function useQuestionTypes() {
  const [questionTypes, setQuestionTypes] = useState([])

  useEffect(() => {
    ;(async () => {
      const types = await getQuestionTypes()

      setQuestionTypes(types)
    })()
  }, [])

  return { questionTypes }
}

export { useQuestionTypes }
