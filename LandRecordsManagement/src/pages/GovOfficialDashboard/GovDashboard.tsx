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

  useEffect(() => {
    setLoading(true);
    try {
      (async function () {
        const userRecords = await getAllUsers(userContract, accounts)
        console.log('userRecords --:>> ', userRecords);
        setUserRecords(userRecords)
        let temp = new Array()
        for (let i = 0; i < userRecords[0].length; i++) {
          temp.push({
            aadharNumber: userRecords[0][i].aadharNumber,
            name: userRecords[0][i].name,
          })
        }
        setUserInfo(temp)
      })();
    } catch (error) {
      console.log('error :>> ', error);
    }
    try {
      (async function () {
        const landRecords = await getAllLands(landContract, accounts)
        console.log('landRecords :>> ', landRecords);
        setLandRecords(landRecords)
        let temp = new Array()
        for (let i = 0; i < landRecords.length; i++) {
          temp.push({
            mutationNumber: landRecords[i].mutationNumber,
            name: landRecords[i].name,
          })
        }
        setLandInfo(temp)
      })()
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, [])

  console.log('userRecords:->>', userRecords[0])
  console.log('userInfo :>> ', userInfo)

  // let userData = [
  //   {
  //     name: 'Parvesh',
  //     dateOfBirth: '09-07-2001',
  //     aadharNumber: '123412341234',
  //     profilePhoto: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     officialDocument: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     isVerified: true,
  //     my : "0xCFD163CC20BeFCF842b10f9ee4FE44c1825BA87c"
  //   },
  //   {
  //     name: 'Parvesh',
  //     dateOfBirth: '09-07-2001',
  //     aadharNumber: '123412341235',
  //     profilePhoto: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     officialDocument: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     isVerified: true,
  //     my : "0xCFD163CC20BeFCF842b10f9ee4FE44c1825BA87c"
  //   },
  //   {
  //     name: 'Parvesh',
  //     dateOfBirth: '09-07-2001',
  //     aadharNumber: '123412341236',
  //     profilePhoto: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     officialDocument: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     isVerified: true,
  //     my : "0xCFD163CC20BeFCF842b10f9ee4FE44c1825BA87c"
  //   },
  //   {
  //     name: 'Parvesh',
  //     dateOfBirth: '09-07-2001',
  //     aadharNumber: '123412341237',
  //     profilePhoto: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     officialDocument: "QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk",
  //     isVerified: true,
  //     my : "0xCFD163CC20BeFCF842b10f9ee4FE44c1825BA87c"
  //   },
  // ]
  // let landData = [
  //   {
  //     id: '127',
  //     name: 'Parvesh Barak',
  //     location: {
  //       state: 'Haryana',
  //       district: 'Rohtak',
  //       tehsil : 'Kalanaur',
  //       village: 'Garnauthi',
  //       pincode: '124412',
  //       longitude: '100',
  //       latitude: '59',
  //       area:'1000'
  //     },
  //     mutationNumber: '123455',
  //     recordHash: 'QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk',
  //     price: '200',
  //     isForSale: true,
  //     isVerified: false
  //   },
  //   {
  //     id: '126',
  //     name: 'Gouri',
  //     location: {
  //       state: 'Haryana',
  //       district: 'Rohtak',
  //       tehsil : 'Kalanaur',
  //       village: 'Garnauthi',
  //       pincode: '124412',
  //       longitude: '100',
  //       latitude: '59',
  //       area:'1000'
  //     },
  //     mutationNumber: '123459',
  //     recordHash: 'QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk',
  //     price: '200',
  //     isForSale: true,
  //     isVerified: false
  //   },
  //   {
  //     id: '125',
  //     name: 'Rahul',
  //     location: {
  //       state: 'Haryana',
  //       district: 'Rohtak',
  //       tehsil : 'Kalanaur',
  //       village: 'Garnauthi',
  //       pincode: '124412',
  //       longitude: '100',
  //       latitude: '59',
  //       area:'1000'
  //     },
  //     mutationNumber: '123458',
  //     recordHash: 'QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk',
  //     price: '200',
  //     isForSale: true,
  //     isVerified: false
  //   },
  //   {
  //     id: '124',
  //     name: 'Parvesh',
  //     location: {
  //       state: 'Haryana',
  //       district: 'Rohtak',
  //       tehsil : 'Kalanaur',
  //       village: 'Garnauthi',
  //       pincode: '124412',
  //       longitude: '100',
  //       latitude: '59',
  //       area:'1000'
  //     },
  //     mutationNumber: '123457',
  //     recordHash: 'QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk',
  //     price: '200',
  //     isForSale: true,
  //     isVerified: false
  //   },
  //   {
  //     id: '123',
  //     name: 'Parvesh Barak',
  //     location: {
  //       state: 'Haryana',
  //       district: 'Rohtak',
  //       tehsil : 'Kalanaur',
  //       village: 'Garnauthi',
  //       pincode: '124412',
  //       longitude: '100',
  //       latitude: '59',
  //       area:'1000'
  //     },
  //     mutationNumber: '123456',
  //     recordHash: 'QmRfXxKjmuuun2JXXAvcELnFXyuEqBoYYvsu3fC5Uo3jFk',
  //     price: '200',
  //     isForSale: true,
  //     isVerified: false
  //   },
  // ]
  // let userInfo = [
  //   {
  //     aadharNumber: '123412341234',
  //     name: 'Parvesh'
  //   },
  //   {
  //     aadharNumber: '123412341235',
  //     name: 'Parvesh'
  //   },
  //   {
  //     aadharNumber: '123412341236',
  //     name: 'Parvesh'
  //   },
  //   {
  //     aadharNumber: '123412341237',
  //     name: 'Parvesh'
  //   },
  // ]
  // let landInfo = [
  //   {
  //     mutationNumber: '123456',
  //     name: 'Parvesh'
  //   },
  //   {
  //     mutationNumber: '123457',
  //     name: 'Rhul'
  //   },
  //   {
  //     mutationNumber: '123458',
  //     name: 'Gulshan'
  //   },
  //   {
  //     mutationNumber: '123459',
  //     name: 'Gouri'
  //   },
  //   {
  //     mutationNumber: '123455',
  //     name: 'Parvesh Barak'
  //   },
  // ]
  let userHeading = ['AdharNumber', 'Name', 'Details']
  let landHeading = ['Mutation Number', 'Owner', 'Details']

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
