import React from 'react'
import UserDetail from './UserDetail'

const Popup = ({ content, onClose }) => {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <UserDetail
            content={content}
        />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default Popup
