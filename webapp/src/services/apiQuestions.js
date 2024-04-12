import { API_ENDPOINT } from '../utils/constants'

const getQuestions = async (numberOfQuestions, language = 'en') => {
  const response = await fetch(
    API_ENDPOINT + `/questions?size=${numberOfQuestions}&lang=${language}`
  )
  const data = await response.json()

  return data
}

export { getQuestions }
