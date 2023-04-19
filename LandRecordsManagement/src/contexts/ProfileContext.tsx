import { createContext } from 'react'

export interface UserProfile {
  name: string
  dateOfBirth: string
  aadharNumber: string
  profilePhoto: string
  officialDocument: string
  isVerified: boolean
}

interface ProfileContextProps {
  userProfile: UserProfile
  updateProfile: (newProfile: UserProfile) => void
}

const ProfileContext = createContext<ProfileContextProps>({
  userProfile: {
    name: '',
    dateOfBirth: '',
    aadharNumber: '',
    profilePhoto: '',
    officialDocument: '',
    isVerified: false,
  },
  updateProfile: () => {},
})

export default ProfileContext
