import React, { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Bg, DefaultIcon, Verified } from '../../assets'
import Input from '../../components/common/Input'
import profileValidationSchema from '../../utils/Validations/ProfieValidations'
import { Formik } from 'formik'
import { getProfile } from '../../utils/admin'
import LoginContext from '../../contexts/LoginContext'
import { addData, getDataAsUrl } from '../../utils/ipfs'
import { addProfile } from '../../utils/user'

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
  const [profilePhoto , setProfilePhoto]  = useState(DefaultIcon);
  const submitHandler = (values: any) => {
    const {name , dob , officialdoc , aadhar , profileimg} = values;

    (async function() {
      const cidO = await addData(officialdoc);
      const cidP = await addData(profileimg);

      const obj = {
        name ,
        dateOfBirth : dob,
        aadharNumber : aadhar,
        profilePhoto : cidP,
        officialDocument : cidO
      }
      await addProfile(userContract , accounts , obj); 
    })();

  }

  useEffect(() => {
    async function fetch() {
      const data = await getProfile(userContract, accounts);
      if (data) {
        const temp = await getDataAsUrl(data.profilePhoto , 'image/jpeg');
        setProfile(data);
        setProfilePhoto(temp);
      }

      
    }
    fetch();
  }, [accounts]);

  return (
    <>
      {!profile ? (
        <Formik
          validationSchema={profileValidationSchema}
          initialValues={{
            name: '',
            dob: '',
            officialdoc: null,
            aadhar: '',
            profileimg: null,
          }}
          onSubmit={(values) => submitHandler(values)}
        >
          {({
            setFieldValue,
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
                      
                        <img
                          src={profilePhoto}
                          id='profileimg'
                          alt='Profile Img'
                          height='150'
                        />
                    </div>
                    <Input
                      id='Images'
                      type='file'
                      onChange={(event) => { setFieldValue('profileimg', event.currentTarget.files[0]); }}
                      accept='image/*'
                      label={'Profile Image'}
                      name='profileimg'
                      value=""
                      errors = {errors}
                    />
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <Input
                        id='name'
                        label='Full Name'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        errors={ errors}
                      />
                    </div>
                    <div className='col'>
                      <Input
                        id='dob'
                        label='Date Of Birth:'
                        name='dob'
                        type='date'
                        value={values.dob}
                        onChange={handleChange}
                        errors = {errors}
                      />
                    </div>
                  </div>
                  <div className='row'> 
                    <div className='col'>
                      <Input
                        id='aadhar'
                        label='Aadhar Number'
                        name='aadhar'
                        value={values.aadhar}
                        onChange={handleChange}
                        errors = {errors}
                      />
                    </div>
                    <div className='col'>
                      <Input
                        id='officialdoc'
                        type='file'
                        onChange={(event) => { setFieldValue('officialdoc', event.currentTarget.files[0]); }}
                        accept='image/*'
                        label={'Official Document'}
                        name='officialdoc'
                        value=""
                        errors = {errors}
                      />
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
            <img src={profilePhoto} alt={name} />
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
