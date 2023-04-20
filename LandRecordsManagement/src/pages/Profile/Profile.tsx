import React, { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Bg, DefaultIcon, Verified, Unverified } from '../../assets'
import Input from '../../components/common/Input'
import profileValidationSchema from '../../utils/Validations/ProfieValidations'
import { Formik } from 'formik'
import { getProfile } from '../../utils/admin'
import LoginContext from '../../contexts/LoginContext'
import { addData, getDataAsUrl } from '../../utils/ipfs'
import { addProfile } from '../../utils/user'
import ProfileContext from '../../contexts/ProfileContext'
import { Loader } from '../../components'


const Profile = () => {

  const { accounts, userContract } = useContext(LoginContext);
  const { userProfile, updateProfile, profilePhoto, setProfilePhoto } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [btnload , setBtnLoad] = useState(false);

  const [imageUrl, setImageUrl] = useState(DefaultIcon);


  const submitHandler = (values: any) => {
    const { name, dob, officialdoc, aadhar, profileimg } = values;

    (async function () {
       setBtnLoad(true);
      const cidO = await addData(officialdoc);
      const cidP = await addData(profileimg);

      const obj = {
        name,
        dateOfBirth: dob,
        aadharNumber: aadhar,
        profilePhoto: cidP,
        officialDocument: cidO
      }
      await addProfile(userContract, accounts, obj);
      setBtnLoad(false);
    })();

  }

  useEffect(() => {

    (async function fetch() {
      setLoading(true);
      const data = await getProfile(userContract, accounts);
      if (data) {
        const temp = await getDataAsUrl(data.profilePhoto, 'image/jpeg');
        updateProfile(data);
        setProfilePhoto(temp);
      }

    })();
    setLoading(false);
  }, [accounts , btnload]);



  if (loading) return <Loader />

  else if (userProfile.name.length <= 0) {
    return (<Formik
      validationSchema={profileValidationSchema}
      initialValues={{
        name: '',
        dob: '',
        officialdoc: null,
        aadhar: '',
        profileimg: '',
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
                    src={imageUrl}
                    id='profileimg'
                    alt='Profile Img'
                    height='150'
                  />
                </div>
                <Input
                  id='Images'
                  type='file'
                  onChange={(event) => {
                    setFieldValue('profileimg', event.currentTarget.files[0]);
                    const file = event.currentTarget.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => setImageUrl(reader.result);
                    reader.readAsDataURL(file);
                  }}
                  accept='image/*'
                  label={'Profile Image'}
                  name='profileimg'
                  errors={errors}
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
                    errors={errors}
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
                    errors={errors}
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
                    errors={errors}
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
                    errors={errors}
                  />
                </div>
              </div>
              <button type='submit' disabled={btnload}> {btnload ? 'Updating Profile...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>)
  }
  else {
    return (
      <div className='profile-page'>
        <div className='profile-header'>
          <img src={profilePhoto} alt='/' />
          <h1>{userProfile.name}</h1>
          {userProfile.isVerified ?
            <img className='verified-badge' src={Verified} /> :
            <img className='unverified-badge' src={Unverified} />}
        </div>
        <div className='aadhar-info'>
          <p>Aadhar number: {userProfile.aadharNumber}</p>
        </div>
        <div className='dateOfBirth'>
          <p>Date of Birth: {userProfile.dateOfBirth}</p>
        </div>
        <div className='totalLands'>
          <p>Total Lands: {userProfile.landIds.length}</p>
        </div>
      </div>
    )
  }
}


export default Profile
