import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import './Profile.css'; 
import { useAuth } from '../../hooks/useAuth'

const Profile = () => {
  const { profile, errorProfile } = useProfile();
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <h1>{user.username}'s profile</h1>
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
                  <td Class="value" >{value}</td>
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

export default Profile;
