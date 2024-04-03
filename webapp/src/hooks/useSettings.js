import { useContext } from 'react'
import { SettingsContext } from '../context/SettingsContext'

export const useSettings = () => {
  return useContext(SettingsContext)
}
