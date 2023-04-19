import { dataLength } from 'ethers'
import React, { FC } from 'react'
import { DetailsIcon, Verified } from '../../assets'
import './style.scss'

interface recordsProps {
  title: string
  heading: Array<string>
  item: Array<any>
  trans: boolean
}

const GovRecords: FC<recordsProps> = ({ title, heading, item, trans }) => {
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
                <tr key={ele&&(ele.mutationNum ? ele.mutationNum : ele.aadharNumber)}>
                  <td>
                    {ele.mutationNum ? ele.mutationNum : ele.aadharNumber}
                  </td>
                  <td>{ele.name}</td>
                  <td><button>View</button></td>
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
