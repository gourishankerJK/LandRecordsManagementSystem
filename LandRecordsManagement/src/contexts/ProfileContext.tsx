import { createContext } from 'react'
import { DefaultIcon } from '../assets'

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
  profilePhoto: string
  officialDocument: string
  updateProfile: (newProfile: UserProfile) => void
  setProfilePhoto: (value: any) => void
  setOfficialDocument: (value: any) => void
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
  officialDocument:"",
  profilePhoto: DefaultIcon,
  updateProfile: () => {},
  setProfilePhoto: () => {},
  setOfficialDocument: () => {},
})

export default ProfileContext
