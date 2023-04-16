import React, { useState, useEffect, useContext } from 'react';
import LoginContext from '../../contexts/LoginContext';

import './style.scss';

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
  mutationNumber : number;
  recordHash: string;
  price: number;
  isForSale : boolean;
}
const UserDashboard = () => {
  const { contract, accounts } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [landRecords, setLandRecords] = useState<LandRecord[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const getLandRecords = async () => {
      try {
        const landRecordsCount = await contract.methods.getLandRecordsCount().call({ from: accounts[0] });
        const records: LandRecord[] = [];
        for (let i = 0; i < landRecordsCount; i++) {
          const record = await contract.methods.getLandRecord(i).call({ from: accounts[0] });
          records.push({
            id: i,
            name: record.name,
            mutationNumber: record.mutationNumber,
            location: record.location,
            recordHash: record.recordHash,
            price: record.price,
            isForSale: record.isForSale
          });
        }
        setLandRecords(records);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    getLandRecords();
  }, [contract, accounts]);

  const renderTableData = () => {
    return landRecords.map((record) => {
      const { id, name, mutationNumber, location, recordHash, price, isForSale } = record;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{mutationNumber}</td>
          <td>{location.state}</td>
          <td>{location.district}</td>
          <td>{location.tehsil}</td>
          <td>{location.village}</td>
          <td>{location.pincode}</td>
          <td>{location.latitude}</td>
          <td>{location.longitude}</td>
          <td>{location.area}</td>
          <td>{recordHash}</td>
          <td>{price}</td>
          <td>{isForSale ? 'Yes' : 'No'}</td>
        </tr>
      );
    });
  }

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mutation Number</th>
            <th>State</th>
            <th>District</th>
            <th>Tehsil</th>
            <th>Village</th>
            <th>Pincode</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Area</th>
            <th>Record Hash</th>
            <th>Price</th>
            <th>For Sale</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default UserDashboard;
