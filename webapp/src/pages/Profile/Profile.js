import { useProfile } from '../../hooks/useProfile'

const Profile = () => {
  const { profile, errorProfile } = useProfile()

  return (
    <div>
      <h1>Profile</h1>
      {errorProfile ? (
        <p style={{ color: '#7b0c0c' }}>{errorProfile}</p>
      ) : (
        <p>{JSON.stringify(profile)}</p>
      )}
    </div>
  )
}

export default Profile
