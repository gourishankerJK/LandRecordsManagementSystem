import React, { useState, useEffect, useContext } from 'react'
import './style.scss'
import Records from '../../components/Rcords/GovRecords'
import LoginContext from '../../contexts/LoginContext'
import { getAllUsers, getAllLands } from '../../utils/admin'
import { Loader } from '../../components'

export interface UserRecord {
  name: string
  dateOfBirth: string
  aadharNumber: string
  profilePhoto: string
  officialDocument: string
  isVerified: boolean
  my: string
}

export interface UserInfo {
  aadharNumber: string
  name: string
}

export interface LandRecord {
  id: number
  name: string
  location: {
    state: string
    district: string
    tehsil: string
    village: string
    pincode: string
    latitude: string
    longitude: string
    area: number
  }
  mutationNumber: number
  recordHash: string
  price: number
  isForSale: boolean
}

export interface LandInfo {
  mutationNumber: string
  name: string
}

const GovDashboard = () => {
  const { accounts, userContract, landContract } = useContext(LoginContext)
  const [userRecords, setUserRecords] = useState<UserRecord[]>([])
  const [userInfo, setUserInfo] = useState<Array<UserInfo>>()
  const [landRecords, setLandRecords] = useState<LandRecord[]>([])
  const [landInfo, setLandInfo] = useState<Array<LandInfo>>()
  const [loading, setLoading] = useState(false)


  const getRecords = async () => {
    const userRecords = await getAllUsers(userContract, accounts)
    console.log('userRecords --:>> ', userRecords)
    const temp = userRecords.map((item: any) => {
      return { aadharNumber: item.user.aadharNumber, name: item.user.name }
    })
    const temp2 = userRecords.map((item: any) => {
      return item.user
    })
    setUserRecords(temp2)
    setUserInfo(temp)
    const landRecords = await getAllLands(landContract, accounts)
    console.log('landRecords :>> ', landRecords)
    setLandRecords(landRecords)
    const temp3 = landRecords.map((item:any) => {
      return { mutationNumber: item.mutationNumber, name: item.name }
    })
    setLandInfo(temp3)
  }

  useEffect(() => {
    setLoading(true)
    console.log('loading here', loading)
    try {
      getRecords()
      setLoading(false)
    } catch (error) {
      console.log('error :>> ', error)
      setLoading(false)
    }
  }, [loading , userContract, landContract])

  
  let userHeading = ['AdharNumber', 'Name', 'Details']
  let landHeading = ['Mutation Number', 'Owner', 'Details']

  console.log('loading :>> ', loading);

  if(loading) return <Loader/>
  return (
    <div id='user-dashboard'>
      <div className='content'>
        <div className='grid2'>
          <div className='col-1'>
            <Records
              heading={userHeading}
              title={'Users'}
              item={userInfo}
              detail={userRecords}
            />
          </div>
          <div className='col-2'>
            <Records
              heading={landHeading}
              title={'Lands'}
              item={landInfo}
              detail={landRecords}
            />
          </div>
        </div>
      </div>
    </div>
    // <div><p>This are coming up soon!</p></div>
  )
}

export default GovDashboard
