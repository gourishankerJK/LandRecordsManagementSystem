import React, { useEffect, useState, FC } from 'react'
import { Unverified, Verified } from '../../assets'
import { getDataAsUrl } from '../../utils/ipfs'
import './style.scss'
import FileViewer from 'react-file-viewer'

interface Props {
  content: any
}

const UserDetail: FC<Props> = ({ content }) => {
  console.log('content', content)
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [officialDocUrl, setOfficialDocUrl] = useState('')  
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  useEffect(() => {
    ;(async function () {
      console.log('hey')
      try {
        console.log('content.profilePhoto', content.officialDocument)
        const temp = await getDataAsUrl(content.profilePhoto, 'image/jpeg')
        const temp2 = await getDataAsUrl(content.officialDocument, 'image/jpeg')
        console.log('temp :>> ', temp)
        setProfilePhotoUrl(temp)
        setOfficialDocUrl(temp2)
      } catch (err) {
        console.log('err :>> ', err)
      }
    })()
  },[])
  console.log('profilePhotoUrl', profilePhotoUrl)
  return (
    <div className='container'>
      <div className='profile-img'>
        <img src={profilePhotoUrl} alt='profile' className='image' />
        <span className='label'>Profile Image</span>
      </div>
      <div className='content'>
        <div className='ele'>
          <span className='label'>Adhaar Number</span>
          <span className='value'>{content.aadharNumber}</span>
        </div>
        <div className='ele'>
          <span className='label'>Name</span>
          <span className='value'>{content.name}</span>
        </div>
        <div className='ele'>
          <span className='label'>Date Of Birth</span>
          <span className='value'>{content.dateOfBirth}</span>
        </div>
        <div className='ele'>
          <span className='label'>Offical Documet</span>
          <button className='value btnele' onClick={handleView} >Privew Document</button>
        </div>
        {view && (
        <FileViewer
          fileType='jpeg'
          filePath={officialDocUrl}
        />
      )}
      </div>
      <div className='verify'>
        <button type='button'> Verify </button>
      </div>
    </div>
  )
}

export default UserDetail
