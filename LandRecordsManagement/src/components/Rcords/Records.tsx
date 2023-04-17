import { dataLength } from 'ethers';
import React, { FC } from 'react'
import { DetailsIcon, Verified } from '../../assets'
import './style.scss'

interface recordsProps {
  title: string;
  heading: Array<string>;
  item: Array<any>;
  trans: boolean
}

const Records: FC<recordsProps> = ({ title, heading, item, trans }) => {
  
  return (
    <div id='records'>
      <h3 className="record-heading">{title}</h3>
      <div className="record-table">
        <table>
          <thead>
            <tr>
              <th>{heading[0]}</th>
              <th>{heading[1]} </th>
              <th>{heading[2]}</th>
              <th>{heading[3]}</th>
              <th>{heading[4]}</th>
              {!trans &&  <th>{heading[5]}</th>}
            </tr>
          </thead>

          <tbody>
            {item?.map((ele) =>{
                return (
                  <tr key={ele?.mutationNum}>
                  <td>{ele.mutationNum}</td>
                  <td>{trans ? ele.sender : ele.name }</td>
                  <td>{trans ? ele.reciever : ele.price }</td>
                  <td>
                    <div className="status">
                      <img src={Verified} alt="" />
                      <span>{trans ? ele.amount : ele.status }</span>
                    </div>
                  </td>
                  <td>{trans ? ele.date : ele.availible ? "YES":"NO" }</td>
                  {!trans && <td>
                      <img src={DetailsIcon} alt=""  style={{width:"20px", height:"20px", lineHeight:"25px", objectFit:"fill"}} />
                    </td>}
                </tr>
                )
            })}
            
          </tbody>




        </table>

      </div>
    </div>
  )
}

export default Records