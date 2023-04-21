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
  const [landRecords, setLandRecords] = useState<LandRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [update , setUpdate] = useState(false);


  const getRecords = async () => {
    const userRecords = await getAllUsers(userContract, accounts)
    console.log('userRecords --:>> ', userRecords)
    setUserRecords(userRecords)
    const landRecords = await getAllLands(landContract, accounts)
    console.log('landRecords :>> ', landRecords)
    setLandRecords(landRecords)
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
  }, [userContract, landContract , update])

  
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
              item={userRecords}
              update = {update}
              setUpdate = {setUpdate}
            />
          </div>
          <div className='col-2'>
            <Records
              heading={landHeading}
              title={'Lands'}
              item={landRecords}
              update = {update}
              setUpdate = {setUpdate}
            />
          </div>
        </div>
      </div>
    </div>
    // <div><p>This are coming up soon!</p></div>
  )
}

export default GovDashboard
