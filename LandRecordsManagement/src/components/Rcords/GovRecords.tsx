import { dataLength } from 'ethers'
import React, { FC, useState } from 'react'
import { DetailsIcon, Verified } from '../../assets'
import Popup from '../../pages/GovOfficialDashboard/Popup'
import LandDetails from '../../pages/LandDetails/LandDetails'
import LandDetail from '../LandDetail/LandDetail'
import LoginModal from '../LoginModal/LoginModal'
import UserDetail from '../UserDetail/UserDetail'
import './style.scss'

interface recordsProps {
  title: string
  heading: Array<string>
  item: Array<any>
  update : boolean
  setUpdate : any
}

const GovRecords: FC<recordsProps> = ({ title, heading, item  , setUpdate , update}) => {
  console.log('item', item)
  const [popupId, setPopupId] = useState(0)

  let subtitle: any
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal(id: any) {
    console.log('modal :>> ')
    setIsOpen(true)
    setPopupId(id)
    console.log('modal :>> ', modalIsOpen)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
    setPopupId(0)
  }

  return (
    <div id='records'>
      <h3 className='record-heading'>{title}</h3>
      <div className='record-table'>
        <table>
          <thead>
            <tr>
              <th>{heading[0]}</th>
              <th>{heading[1]} </th>
              <th>{heading[2]}</th>
            </tr>
          </thead>

          <tbody>
            {item?.map((ele) => {
              return (
                <tr
                  key={
                    ele &&
                    (ele.mutationNumber ? ele.mutationNumber : ele.aadharNumber)
                  }
                >
                  <td>
                    {ele.mutationNumber ? ele.mutationNumber : ele.aadharNumber}
                  </td>
                  <td>{ele.name}</td>
                  <td>
                    <button onClick={() => openModal(ele.aadharNumber ? ele.aadharNumber : ele.mutationNumber)}>
                      View
                    </button>
                    {modalIsOpen && (
                      <LoginModal
                        title={ele.aadharNumber ? "User Detail" : "Land Detail"}
                        children={
                          ele.aadharNumber ?
                          <UserDetail
                            content={item.find((e) => e.aadharNumber === popupId)}
                            setUpdate = {setUpdate}
                            update = {update}
                            
                          /> :
                          <LandDetail
                          content={item.find(
                            (e) => e.mutationNumber === popupId
                          )}

                          setUpdate = {setUpdate}
                          update = {update}
                        />
                        }
                        afterOpenModal={afterOpenModal}
                        closeModal={closeModal}
                        modalIsOpen={modalIsOpen}
                        subtitle={subtitle}
                      />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const children = () => {
  return <h1>Hello World</h1>
}
export default GovRecords
