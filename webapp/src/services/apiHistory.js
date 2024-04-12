import { API_ENDPOINT } from '../utils/constants'

const incrementHistory = async (userToken, history) => {
  const body = JSON.stringify({
    history,
  })

  const response = await fetch(API_ENDPOINT + `/history/increment`, {
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

export { incrementHistory }
