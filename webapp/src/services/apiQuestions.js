import { API_ENDPOINT } from '../utils/constants'

const getQuestions = async (numberOfQuestions, language = 'en', questionTypes = []) => {
  const questionTypesString = questionTypes.map(questionType => `&type=${questionType}`).join('')
  const response = await fetch(
    API_ENDPOINT + `/questions?size=${numberOfQuestions}&lang=${language}${questionTypesString}`
  )
  const data = await response.json()

  return data
}

const getQuestionTypes = async () => {
  const response = await fetch(API_ENDPOINT + `/questions/types`)
  const { types } = await response.json()

  return types
}

export { getQuestions, getQuestionTypes }
