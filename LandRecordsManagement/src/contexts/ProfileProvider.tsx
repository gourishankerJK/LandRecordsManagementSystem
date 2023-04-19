import React, { useState } from 'react'
import { DefaultIcon } from '../assets'
import ProfileContext,{ UserProfile }  from './ProfileContext'

interface ProfileProviderProps {
  children: React.ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}: ProfileProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    aadharNumber: '',
    profilePhoto: '',
    officialDocument: '',
    isVerified: false,
  })

  const [profilePhoto, setProfilePhoto] = useState(DefaultIcon)
  const [officialDocument, setOfficialDocument] = useState('')

  const updateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile)
  }

  const contextValue = {
    userProfile,
    updateProfile,
    profilePhoto,
    officialDocument,
    setOfficialDocument,
    setProfilePhoto
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}
