import React, { useState, useEffect, useContext } from 'react'
import './style.scss'
import Records from '../../components/Rcords/GovRecords'
import LoginContext from '../../contexts/LoginContext'
import { getAllUsers, getAllLands } from '../../utils/admin'

export interface UserRecord {
  name: string
  dateOfBirth: string
  aadharNumber: string
  profilePhoto: string
  officialDocument: string
  isVerified: boolean
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
  // const { accounts, userContract, landContract } = useContext(LoginContext)
  // const [userRecords, setUserRecords] = useState<UserRecord[]>([])
  // const [userInfo, setUserInfo] = useState<Array<UserInfo>>()
  // const [landRecords, setLandRecords] = useState<LandRecord[]>([])
  // const [landInfo, setLandInfo] = useState<Array<LandInfo>>()
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true);
  //   (async function () {
  //     const userRecords = await getAllUsers(userContract, accounts)
  //     setUserRecords(userRecords[0])
  //     let temp = new Array()
  //     for (let i = 0; i < userRecords[0].length; i++) {
  //       temp.push({
  //         aadharNumber: userRecords[0][i].aadharNumber,
  //         name: userRecords[0][i].name,
  //       })
  //     }
  //     setUserInfo(temp)
  //   })();
  //   (async function () {
  //     const landRecords = await getAllLands(landContract, accounts)
  //     console.log('landRecords :>> ', landRecords);
  //     setUserRecords(landRecords[0])
  //     let temp = new Array()
  //     for (let i = 0; i < landRecords[0].length; i++) {
  //       temp.push({
  //         mutationNumber: landRecords[0][i].aadharNumber,
  //         name: landRecords[0][i].name,
  //       })
  //     }
  //     setUserInfo(temp)
  //   })()
  // }, [])

  // console.log('userRecords:->>', userRecords[0])
  // console.log('userInfo :>> ', userInfo)

  let userData = []
  let landData = []
  let userHeading = ['AdharNumber', 'Name', 'Details']
  let landHeading = ['Muation Number', 'Owner', 'Details']
  return (
    <div id='user-dashboard'>
      <div className='content'>
        <div className='grid2'>
          <div className='col-1'>
            <Records
              heading={userHeading}
              title={'Users'}
              item={userData}
              trans={false}
            />
          </div>
          <div className='col-2'>
            <Records
              heading={landHeading}
              title={'Lands'}
              item={landData}
              trans={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GovDashboard
