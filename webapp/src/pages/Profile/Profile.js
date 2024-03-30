import React, { useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import './Profile.css';
import { useAuth } from '../../hooks/useAuth';
import { Modal, Fade } from '@mui/material';

const Profile = () => {
  const { profile, errorProfile } = useProfile();
  const { user } = useAuth();
  const [bio, setBio] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAvatarText, setShowAvatarText] = useState(false);

  useEffect(() => {
    const savedBio = localStorage.getItem('bio');
    if (savedBio) {
      setBio(savedBio);
    }
  }, []);

  const handleBioChange = (event) => {
    const newBio = event.target.value;
    setBio(newBio);
    localStorage.setItem('bio', newBio);
    setShowAvatarText(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    localStorage.setItem('selectedImage', image);
    setOpen(false);
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  return (
      <div className="profile-container">
        <h1>{user.username}'s profile</h1>
        <div className="user-select">

          <div className="profile-header">
            <img
                src={selectedImage ? require(`../../assets/pictures/${selectedImage}`) : require('../../assets/pictures/default-avatar.png')}
                alt="Selected Profile Image"
                onClick={() => setOpen(true)}
                onMouseEnter={() => setShowAvatarText(true)}
                onMouseLeave={() => setShowAvatarText(false)}
            />
            {showAvatarText && <p className="selection-text">Choose your avatar!</p>}
          </div>

          <div className="bio-container">
            <h2>Bio</h2>
            <textarea
                className="bio-textarea"
                value={bio}
                onChange={handleBioChange}
                placeholder="Here you can write something about you! Or just write anything what's on your mind :)"
                maxLength={100}
                style={{ width: '100%', minHeight: '100px' }}
            />
          </div>
        </div>

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
                <img src={require('../../assets/pictures/elephant.png')} alt="elephant"
                     onClick={() => handleImageSelect('elephant.png')} />
                <img src={require('../../assets/pictures/fox.png')} alt="fox"
                     onClick={() => handleImageSelect('fox.png')} />
                <img src={require('../../assets/pictures/giraffe.png')} alt="giraffe"
                     onClick={() => handleImageSelect('giraffe.png')} />
                <img src={require('../../assets/pictures/goose.jpg')} alt="goose"
                     onClick={() => handleImageSelect('goose.jpg')} />
                <img src={require('../../assets/pictures/parrot.png')} alt="parrot"
                     onClick={() => handleImageSelect('parrot.png')} />
                <img src={require('../../assets/pictures/rabbit.png')} alt="rabbit"
                     onClick={() => handleImageSelect('rabbit.png')} />
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
                        <td>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}</td>
                        <td className="value">{value}</td>
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
  );
};
export default Profile
