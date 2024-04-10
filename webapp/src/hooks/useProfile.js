import { useEffect, useState } from 'react'
import { getProfile } from '../services/apiProfile'
import { getBiography } from '../services/apiBiography'
import { useAuth } from './useAuth'

export const useProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({})
  const [biography, setBiography] = useState({})
  const [errorBiography, setErrorBiography] = useState()
  const [errorProfile, setErrorProfile] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        if (!user) {
          setErrorProfile('Only logged users can see their profile')
          return
        }

        const [profile, biography] = await Promise.all([
          await getProfile(user.username),
          await getBiography(user.username),
        ])

        if (profile.status === 'fail') {
          setErrorProfile(profile.data.error)
        } else {
          setProfile(profile.data)
        }

        if (biography.status === 'fail') {
          setErrorBiography(biography.data.error)
        } else {
          setBiography(biography.data)
        }
      } catch (err) {
        setErrorProfile(err.data)
      }
    })()
  }, [user])

  return { profile, errorProfile, biography, errorBiography }
}
