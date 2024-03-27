import { useEffect, useState } from "react"

const useTheme = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"))
    }
  }, [theme])

  const changeThemeHandler = () => {
    setTheme(prevState => {
      return prevState === "light" ? "dark" : "light"
    })

    localStorage.setItem("theme", theme === "light" ? "dark" : "light")
  }

  return { theme, changeThemeHandler }
}

export { useTheme }
