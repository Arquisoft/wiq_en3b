import { useCallback, useState } from "react"

const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  return [value, toggle]
}

export { useToggle }
