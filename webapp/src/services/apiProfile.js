import { API_ENDPOINT } from '../utils/constants'

const getProfile = async user => {
  const response = await fetch(API_ENDPOINT + `/history?user=${user}`)
  const data = await response.json()

  return data
}

export { getProfile }
