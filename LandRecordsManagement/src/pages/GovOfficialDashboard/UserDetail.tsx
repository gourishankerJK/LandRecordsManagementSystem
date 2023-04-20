import React from 'react'

const UserDetail = ({ content }) => {
  console.log('content', content)
  return (
    <div className='userDetail'>
      <p>{content.aadharNumber}</p>
    </div>
  )
}

export default UserDetail
