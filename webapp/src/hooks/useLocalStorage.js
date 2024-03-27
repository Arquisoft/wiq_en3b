import { useCallback, useState } from 'react'

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      if (value) {
        return JSON.parse(value)
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = useCallback(
    newValue => {
      try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue))
      } catch (err) {
        console.log(err)
      }
      setStoredValue(newValue)
    },
    [keyName]
  )

  return [storedValue, setValue]
}
