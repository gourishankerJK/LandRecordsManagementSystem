import React, { useState } from 'react'
import './style.scss'
import { Bg, Verified } from '../../assets'
import Input from '../../components/common/Input'

interface ProfilePageProps {
  name: string
  photo: string
  verified: boolean
  aadharNumber: string
}

const Profile: React.FC<ProfilePageProps> = ({
  name,
  photo,
  verified,
  aadharNumber,
}) => {
  const [profile, setProfile] = useState(false)
  let img = 'sff'
  const handleInputChange = () => {}
  return (
    <>
      {!profile ? (
        <div className='profile-form'>
          <h3 className='profile-heading'>Complete Your Profile</h3>
          <div className='container'>
            <div className='form-ele'>
              <div className='profile-img'>
                {!img ? (
                  <span className='avatar'>
                    <p className='initials'>AB</p>
                  </span>
                ) : (
                  <img src={Bg} alt='Profile Img' height='150' />
                )}
              </div>
              <Input
                id='Images'
                type='file'
                onChange={handleInputChange}
                accept='image/*'
                label={'Images'}
                value={''}
              />
            </div>
            <div className='row'>
              <div className='col'>
                <Input
                  id='name'
                  label='Full Name'
                  name='name'
                  value={''}
                  onChange={handleInputChange}
                 
                />
              </div>
              <div className='col'>
                <Input
                  id='dob'
                  label='Date Of Birth:'
                  name='dob'
                  type='date'
                  value={'formData.location.district'}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='profile-page'>
          <div className='profile-header'>
            <img src={photo} alt={name} />
            <h1>{name}</h1>
            {verified && <span className='verified-badge'>Verified</span>}
          </div>
          <div className='aadhar-info'>
            <p>Aadhar number: {aadharNumber}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
