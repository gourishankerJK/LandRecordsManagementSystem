import React, { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Bg, Verified } from '../../assets'
import Input from '../../components/common/Input'
import profileValidationSchema from '../../utils/Validations/ProfieValidations'
import { Formik } from 'formik'
import { getProfile } from '../../utils/admin'
import LoginContext from '../../contexts/LoginContext'

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

  const { accounts, userContract } = useContext(LoginContext);
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  let img = 'sff'
  const submitHandler = (values: any) => {
    console.log(values)
  }
  useEffect(() => {
    async function fetch() {
      const data = await getProfile(userContract, accounts);
      if (data) setProfile(data);
    }
    fetch();
  }, [profile])
  return (
    <>
      {!profile ? (
        <Formik
          validationSchema={profileValidationSchema}
          initialValues={{
            name: '',
            dob: '',
            officialdoc: '',
            adhar: '',
            profileimg: '',
          }}
          onSubmit={(values) => submitHandler(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <div className='profile-form'>
              <h3 className='profile-heading'>Complete Your Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className='container'>
                  <div className='form-ele'>
                    <div className='profile-img'>
                      {!img ? (
                        <span className='avatar'>
                          <p className='initials'>AB</p>
                        </span>
                      ) : (
                        <img
                          src={Bg}
                          id='profileimg'
                          alt='Profile Img'
                          height='150'
                        />
                      )}
                    </div>
                    <Input
                      id='Images'
                      type='file'
                      onChange={handleChange}
                      accept='image/*'
                      label={'Images'}
                      name='profileimg'
                      value={values.profileimg}
                    />
                    {errors.profileimg && (
                      <p style={{ fontSize: 10, color: 'red' }}>
                        {errors.profileimg}
                      </p>
                    )}
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <Input
                        id='name'
                        label='Full Name'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p style={{ fontSize: 10, color: 'red' }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className='col'>
                      <Input
                        id='dob'
                        label='Date Of Birth:'
                        name='dob'
                        type='date'
                        value={values.dob}
                        onChange={handleChange}
                      />
                      {errors.dob && (
                        <p style={{ fontSize: 10, color: 'red' }}>
                          {errors.dob}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <Input
                        id='adhar'
                        label='Adhar Numbeer'
                        name='adhar'
                        value={values.adhar}
                        onChange={handleChange}
                      />
                      {errors.adhar && (
                        <p style={{ fontSize: 10, color: 'red' }}>
                          {errors.adhar}
                        </p>
                      )}
                    </div>
                    <div className='col'>
                      <Input
                        id='officialdoc'
                        type='file'
                        onChange={handleChange}
                        accept='image/*'
                        label={'Official Document'}
                        name='officialdoc'
                        value={values.officialdoc}
                      />
                      {errors.officialdoc && (
                        <p style={{ fontSize: 10, color: 'red' }}>
                          {errors.officialdoc}
                        </p>
                      )}
                    </div>
                  </div>
                  <button type='submit' disabled={loading}>
                    {loading ? 'Updating Profile...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Formik>
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
