import React, { useState, useEffect, useMemo } from 'react'
import { useProfile } from '../../hooks/useProfile'
import './Profile.css'
import { useAuth } from '../../hooks/useAuth'
import { Modal, Fade } from '@mui/material'
import { updateBiography } from '../../services/apiBiography'
import { debounce } from '../../utils/debounce'
import { formatTime } from '../../utils/formatTime'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { username } = useParams();
  const { profile, errorProfile, biography, errorBiography } = useProfile(username)
  const { user } = useAuth()
  const [bio, setBio] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [open, setOpen] = useState(false)
  const [showAvatarText, setShowAvatarText] = useState(false)
  const canModify = (!username || username === user?.username) && !errorProfile

  useEffect(() => {
    setBio(biography?.profile?.bio)
    setSelectedImage(biography?.profile?.pic)
  }, [biography, errorBiography])

  const debounceUpdateBio = useMemo(
    () =>
      debounce(newBio => {
        updateBiography(user?.token, { bio: newBio, pic: selectedImage })
      }, 1000),
    [selectedImage, user?.token]
  )

  const handleBioChange = event => {
    const newBio = event.target.value
    debounceUpdateBio(newBio)
    setBio(newBio)
    setShowAvatarText(false)
  }

  const handleImageSelect = image => {
    updateBiography(user.token, { bio, pic: image })
    setSelectedImage(image)
    setOpen(false)
  }

  useEffect(() => {
    const savedImage = localStorage.getItem('selectedImage')
    if (savedImage) {
    }
  }, [])

  return (
    <div className="profile-container">
      {(username || user) && <h1 className="profile-title">{username ? username : user?.username}'s profile</h1>}
      {(username || user) &&
      <div className={canModify || bio ? "user-select" : ""}>
        <div className={`${canModify ? "profile-header" : "other-user-header"} ${(!selectedImage 
            || selectedImage === "default-avatar.png") && "circle-shadow"}`}>
          <img
            src={
              selectedImage
                ? require(`../../assets/pictures/${selectedImage}`)
                : require('../../assets/pictures/default-avatar.png')
            }
            alt="Selected Profile"
            onClick={() => setOpen(canModify)}
            onMouseEnter={() => setShowAvatarText(canModify)}
            onMouseLeave={() => setShowAvatarText(false)}
          />
          {showAvatarText && (
            <p className="selection-text">Choose your avatar!</p>
          )}
        </div>

        <div className="bio-container">
          {(canModify || bio) && (<h2>Bio</h2>)}
          {canModify ? (
          <textarea
            className="bio-textarea"
            value={bio}
            onChange={handleBioChange}
            placeholder="Here you can write something about you! Or just write anything what's on your mind :)"
            maxLength={100}
            style={{ width: '100%', minHeight: '100px' }}
          />
          ) : bio && (
          <p className="bio-textarea">
            {bio}
          </p>
          )}
        </div>
      </div>
      }


      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-descriptidon"
        closeAfterTransition
      >
        <Fade in={open}>
          <div className="modal-container">
            <div className="profile-images">
              <img
                src={require('../../assets/pictures/elephant.png')}
                alt="elephant"
                onClick={() => handleImageSelect('elephant.png')}
              />
              <img
                src={require('../../assets/pictures/fox.png')}
                alt="fox"
                onClick={() => handleImageSelect('fox.png')}
              />
              <img
                src={require('../../assets/pictures/giraffe.png')}
                alt="giraffe"
                onClick={() => handleImageSelect('giraffe.png')}
              />
              <img
                src={require('../../assets/pictures/goose.jpg')}
                alt="goose"
                onClick={() => handleImageSelect('goose.jpg')}
              />
              <img
                src={require('../../assets/pictures/parrot.png')}
                alt="parrot"
                onClick={() => handleImageSelect('parrot.png')}
              />
              <img
                src={require('../../assets/pictures/rabbit.png')}
                alt="rabbit"
                onClick={() => handleImageSelect('rabbit.png')}
              />
            </div>
          </div>
        </Fade>
      </Modal>


      {errorProfile ? (
        <p style={{ color: '#7b0c0c' }}>{errorProfile}</p>
      ) : (
        <table className="profile-table">
          <thead>
            <tr>
              <th colSpan="2">Statistic</th>
            </tr>
          </thead>
          <tbody>
            {profile && profile.history ? (
              Object.entries(profile.history).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    {key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, ' $1')
                        .trim()}
                  </td>
                  {
                    key === 'timePlayed' ? (
                      <td className="value">{formatTime(value)}</td>
                    ) : (
                      <td className="value">{value}</td>
                    )
                  }
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No profile data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default Profile
