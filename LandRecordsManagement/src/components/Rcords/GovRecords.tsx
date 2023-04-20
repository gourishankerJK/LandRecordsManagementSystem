import { dataLength } from 'ethers'
import React, { FC, useState } from 'react'
import { DetailsIcon, Verified } from '../../assets'
import Popup from '../../pages/GovOfficialDashboard/Popup'
import './style.scss'

interface recordsProps {
  title: string
  heading: Array<string>
  item: Array<any>
  detail: Array<any>
}

const GovRecords: FC<recordsProps> = ({ title, heading, item, detail }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

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
                    <button onClick={handleClick}>View</button>
                    {showPopup && (
                      <Popup
                        content={detail?.map((ele) => {
                          
                        })}
                        onClose={handleClose}
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

export default GovRecords
