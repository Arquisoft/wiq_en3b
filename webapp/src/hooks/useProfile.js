import { useEffect, useState } from 'react'
import { getProfile } from '../services/apiProfile'
import { useAuth } from './useAuth'

export const useProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({})
  const [errorProfile, setErrorProfile] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        if (!user) {
          setErrorProfile('Only logged users can see their profile')
          return
        }

        const profile = await getProfile(user.username)

        if (profile.status === 'fail') {
          setErrorProfile(profile.data.error)
        } else {
          setProfile(profile.data)
        }
      } catch (err) {
        setErrorProfile(err.data)
      }
    })()
  }, [user])

  return { profile, errorProfile }
}
