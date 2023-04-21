import React, { useState, useEffect, useContext } from 'react';
import LoginContext from '../../contexts/LoginContext';
import { Verified } from '../../assets';
import './style.scss';
import Records from '../../components/Rcords/Records';
import TransectionHistory from '../../components/TransectionHistory/TransectionHistory';

export interface LandRecord {
  id: number;
  name: string;
  location: {
    state: string;
    district: string;
    tehsil: string;
    village: string;
    pincode: string;
    latitude: string;
    longitude: string;
    area: number;
  };
  mutationNumber: number;
  recordHash: string;
  price: number;
  isForSale: boolean;
}
const UserDashboard = () => {
  let recorData = [
    {
      mutationNum: '#wewref4435',
      name: "Land Name",
      price: '3 lac/ekad',
      status: "Verified",
      availible: true
    },
    {
      mutationNum: '#11ref4435',
      name: "Land Name",
      price: '3 lac/ekad',
      status: "Verified",
      availible: true
    }
    , {
      mutationNum: '#54wref4435',
      name: "Land Name",
      price: '3 lac/ekad',
      status: "Verified",
      availible: false
    },
    {
      mutationNum: '#12ef4435',
      name: "Land Name",
      price: '3 lac/ekad',
      status: "Verified",
      availible: true
    }
  ]
  let transectionData = [
    {
      mutationNum: '#w11ref4435',
      sender: "Rahul ",
      reciever: 'Parvesh',
      amount: "5 ETH",
      date: "01-02-2023"
    },
    {
      mutationNum: '#43wref4435',
      sender: "Rahul ",
      reciever: 'Parvesh',
      amount: "5 ETH",
      date: "01-02-2023"
    },
    {
      mutationNum: '#34ref4435',
      sender: "Rahul ",
      reciever: 'Parvesh',
      amount: "5 ETH",
      date: "01-02-2023"
    },
    {
      mutationNum: '#12wref4435',
      sender: "Rahul ",
      reciever: 'Parvesh',
      amount: "5 ETH",
      date: "01-02-2023"
    },
  ]
  let recordHeading = ["Area", "Location", "Price", "Status", "Availibity", ""];
  let trasectionHeading = ["Muation Number", "Sender", "Reciever", "Amount", "Date"]
  // const { contract, accounts } = useContext(LoginContext);
  // const [loading, setLoading] = useState(false);
  // const [landRecords, setLandRecords] = useState<LandRecord[]>([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   setLoading(true);

  //   const getLandRecords = async () => {
  //     try {
  //       const landRecordsCount = await contract.methods.getLandRecordsCount().call({ from: accounts[0] });
  //       const records: LandRecord[] = [];
  //       for (let i = 0; i < landRecordsCount; i++) {
  //         const record = await contract.methods.getLandRecord(i).call({ from: accounts[0] });
  //         records.push({
  //           id: i,
  //           name: record.name,
  //           mutationNumber: record.mutationNumber,
  //           location: record.location,
  //           recordHash: record.recordHash,
  //           price: record.price,
  //           isForSale: record.isForSale
  //         });
  //       }
  //       setLandRecords(records);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   }

  //   getLandRecords();
  // }, [contract, accounts]);

  // const renderTableData = () => {
  //   return landRecords.map((record) => {
  //     const { id, name, mutationNumber, location, recordHash, price, isForSale } = record;
  //     return (
  //       <tr key={id}>
  //         <td>{name}</td>
  //         <td>{mutationNumber}</td>
  //         <td>{location.state}</td>
  //         <td>{location.district}</td>
  //         <td>{location.tehsil}</td>
  //         <td>{location.village}</td>
  //         <td>{location.pincode}</td>
  //         <td>{location.latitude}</td>
  //         <td>{location.longitude}</td>
  //         <td>{location.area}</td>
  //         <td>{recordHash}</td>
  //         <td>{price}</td>
  //         <td>{isForSale ? 'Yes' : 'No'}</td>
  //       </tr>
  //     );
  //   });
  // }

  return (
    <div id="user-dashboard">
      <div className="content">
        <div className="grid2">
          <div className="col-1">
            <Records heading={recordHeading} title={'Available Lands'} item={recorData} trans={false} />
          </div>
          <div className="col-2">
            <Records heading={trasectionHeading} title={'Transection History'} item={transectionData} trans={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
