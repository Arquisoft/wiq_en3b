import { API_ENDPOINT } from '../utils/constants'

const getBiography = async user => {
  const response = await fetch(API_ENDPOINT + `/profile?user=${user}`)
  const data = await response.json()

  return data
}

const updateBiography = async (userToken, newBiography) => {
  const body = JSON.stringify({
    profile: newBiography,
  })

  const response = await fetch(API_ENDPOINT + `/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body,
  })
  const data = await response.json()

  return data
}

export { getBiography, updateBiography }
