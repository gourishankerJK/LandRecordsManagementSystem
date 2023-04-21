import React, { useEffect, useState, FC, useContext } from 'react'
import { Unverified, Verified } from '../../assets'
import { getDataAsUrl } from '../../utils/ipfs'
import './style.scss'
import FileViewer from 'react-file-viewer'
import LoginContext from '../../contexts/LoginContext'
import { verifyLand } from '../../utils/govOfficial'

interface Props {
  content: any
}

const LandDetail: FC<Props> = ({ content }) => {
  console.log('content', content)
  const [officialDocUrl, setOfficialDocUrl] = useState('')
  const [view, setView] = useState(false)
  const [check, setCheck] = useState(false)
  const { landContract, accounts } = useContext(LoginContext)

  const handleView = () => {
    setView(!view)
  }

  const handleVerify = async (land_id: any) => {
    try {
      await verifyLand(landContract, accounts, land_id)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    ;(async function () {
      try {
        console.log('content.recordHash', content.recordHash)
        const temp = await getDataAsUrl(content.recordHash, 'image/jpeg')
        setOfficialDocUrl(temp)
      } catch (err) {
        console.log('err :>> ', err)
      }
    })()
  }, [])

  console.log('officialDocUrl :>> ', officialDocUrl)
  return (
    <div id='landdetails-container'>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>ID:</span>
            <span className='value'>{content.id}</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Mutation Number:</span>
            <span className='value'>{content.mutationNumber}</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Owner:</span>
            <span className='value'>{content.name}</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Price:</span>
            <span className='value'>{content.price}</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Area:</span>
            <span className='value'>{content.area}</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Village:</span>
            <span className='value'>{content.location.village}</span>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>District</span>
            <span className='value'>{content.location.district}</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>State:</span>
            <span className='value'>{content.location.state}</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Document</span>
            <span className='preview' onClick={handleView}>
              Preivew
            </span>
            {view && <FileViewer fileType='jpeg' filePath={officialDocUrl} />}
          </div>
        </div>
      </div>
      <div className='ele'>
        <input
          type='checkbox'
          className='value'
          onClick={() => setCheck(!check)}
        />
        <span className='label'>
          {' '}
          I have verified all the details and documents
        </span>
      </div>
      <div className='verify'>
        <button type='button' className={(content.isVerified || !check) ? 'disabled' : ''} onClick={() => handleVerify(content.id)} disabled={content.isVerified || !check}>
          {' '}
          Verify{' '}
        </button>
      </div>
    </div>
  )
}

export default LandDetail
