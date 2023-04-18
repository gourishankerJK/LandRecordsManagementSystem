import React from 'react';
import './style.scss';
import { Verified } from '../../assets';

interface ProfilePageProps {
  name: string;
  photo: string;
  verified: boolean;
  aadharNumber: string;
}

const Profile: React.FC<ProfilePageProps> = ({ name, photo, verified, aadharNumber }) => {
  return (

    <div className="profile-page">
      <div className="profile-header">
        <img src={photo} alt={name} />
        <h1>{name}</h1>
        {verified && <span className="verified-badge">Verified</span>}
      </div>
      <div className="aadhar-info">
        <p>Aadhar number: {aadharNumber}</p>
      </div>
    </div>
  );
};

export default Profile;
