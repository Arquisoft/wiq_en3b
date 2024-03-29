import { createContext, useCallback, useMemo } from 'react'
import { DEFAULT_TIME } from '../utils/constants'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    time: DEFAULT_TIME,
  })

  const changeTimeTo = useCallback(
    newTime => {
      setSettings({
        time: newTime,
      })
    },
    [setSettings]
  )

  const value = useMemo(
    () => ({
      time: settings.time,
      changeTimeTo,
    }),
    [settings.time, changeTimeTo]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
