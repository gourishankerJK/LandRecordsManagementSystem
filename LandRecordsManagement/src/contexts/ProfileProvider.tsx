import React, { useState } from 'react'
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

  const updateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile)
  }

  const contextValue = {
    userProfile,
    updateProfile,
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}
