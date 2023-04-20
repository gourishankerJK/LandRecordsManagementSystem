import React, { useEffect, useState, FC } from 'react'
import { Unverified, Verified } from '../../assets'
import { getDataAsUrl } from '../../utils/ipfs'
import './style.scss'

interface Props {
  content: any
}

const LandDetail: FC<Props> = ({ content }) => {
  console.log('content', content)
  const [officialDocUrl, setOfficialDocUrl] = useState('')
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
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>ID:</span>
            <span className='value'>125</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Mutation Number:</span>
            <span className='value'>1#25</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Owner:</span>
            <span className='value'>125</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Price:</span>
            <span className='value'>1#25</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Area:</span>
            <span className='value'>125</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Village:</span>
            <span className='value'>1#25</span>
          </div>
        </div>
      </div>
     
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>District</span>
            <span className='value'>125</span>
          </div>
        </div>
        <div className='col'>
          <div className='ele'>
            <span className='label'>State:</span>
            <span className='value'>1#25</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='ele'>
            <span className='label'>Document</span>
            <span className='preview'>Preivew</span>
          </div>
        </div>
        
      </div>
      <div className='verify'>
        <button type='button'> Verify </button>
      </div>
    </div>
  )
}

export default LandDetail
