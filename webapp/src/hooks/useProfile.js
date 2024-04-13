import { useEffect, useState } from 'react'
import { getProfile } from '../services/apiProfile'
import { getBiography } from '../services/apiBiography'
import { useAuth } from './useAuth'

export const useProfile = (username) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({})
  const [biography, setBiography] = useState({})
  const [errorBiography, setErrorBiography] = useState()
  const [errorProfile, setErrorProfile] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        if (!username && !user) {
          setErrorProfile('Only logged users can see their own profile')
          return
        }

        const [profile, biography] = await Promise.all([
          await getProfile(username ? username : user.username),
          await getBiography(username ? username : user.username),
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
  }, [user, username])

  return { profile, errorProfile, biography, errorBiography }
}
