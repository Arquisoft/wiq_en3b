import { createContext, useCallback, useMemo } from 'react'
import { DEFAULT_TIME } from '../utils/constants'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    time: DEFAULT_TIME,
    theme: 'light',
  })

  const changeTimeTo = useCallback(
    newTime => {
      const newSettings = {
        ...settings,
        time: newTime,
      };
      setSettings(newSettings);
    },
    [settings, setSettings]
  )
  
  const toggleTheme = useCallback(() => {
    const newSettings = {
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    };
    setSettings(newSettings);
  }, [settings, setSettings])

  const value = useMemo(
    () => ({
      time: settings.time,
      theme: settings.theme,
      changeTimeTo,
      toggleTheme,
    }),
    [settings.time, settings.theme, changeTimeTo, toggleTheme]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
