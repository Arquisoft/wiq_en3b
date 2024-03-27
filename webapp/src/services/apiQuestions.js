import { API_ENDPOINT } from "../utils/constants"

const getQuestions = async () => {
  const response = await fetch(API_ENDPOINT + "/questions?size=3")
  const data = await response.json()

  return data
}

export { getQuestions }
