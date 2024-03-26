import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const { profile, errorProfile } = useProfile();

  return (
    <div>
      <h1>Profile</h1>
      {errorProfile ? (
        <p style={{ color: '#7b0c0c' }}>{errorProfile}</p>
      ) : (
        <table className="profile-table"> {/* Add class for styling */}
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {profile && profile.history ? (
              Object.entries(profile.history).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
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
