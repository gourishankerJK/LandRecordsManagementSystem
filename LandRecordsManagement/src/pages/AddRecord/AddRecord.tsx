import React, { useState, useContext, useRef } from 'react'
import LoginContext from '../../contexts/LoginContext';
import Input from '../../components/common/Input';
import './style.scss'
import Loader from '../../components/Loader/Loader';

const AddRecord = () => {
  const { accounts, landContract : contract } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    name: "",
    mutationNumber: "",
    location: {
      state: "",
      district: "",
      tehsil: "",
      village: "",
      pincode: "",
      latitude: "",
      longitude: "",
      area: "",
    },
    recordHash: "",
    price: "",
    isForSale: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event:any) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({ ...prevState, [name]: checked }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setLoading(true);

    console.log("Gdsf");
    try {
      await contract.methods
        .addLandRecord(
          formData.name,
          formData.mutationNumber,
          formData.location,
          formData.recordHash,
          formData.price,
          formData.isForSale
        )
        .send({ from: accounts[0] });
      setLoading(false);
      setError(null);
      setFormData({
        name: "",
        mutationNumber: "",
        location: {
          state: "",
          district: "",
          tehsil: "",
          village: "",
          pincode: "",
          latitude: "",
          longitude: "",
          area: "",
        },
        recordHash: "",
        price: "",
        isForSale: false
      });
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className="add-record">

      <div>
        <h2> Add a New Land Record</h2>
        <h3>Complete the form to add a new land record</h3>
        <p>Please provide accurate details about the land record you want to add.
          This information will help interested parties to assess the land and make
          informed decisions.</p>
      </div>

      <form onSubmit={handleSubmit} >
        <Input
          id="name"
          label="Name:"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          id="mutationNumber"
          label="Mutation Number:"
          name="mutationNumber"
          value={formData.mutationNumber}
          onChange={handleInputChange}
        />

        <Input
          id="state"
          label="State:"
          name="location.state"
          value={formData.location.state}
          onChange={handleInputChange}
        />

        <Input
          id="district"
          label="District:"
          name="location.district"
          value={formData.location.district}
          onChange={handleInputChange}
        />

        <Input
          id="tehsil"
          label="Tehsil:"
          name="location.tehsil"
          value={formData.location.tehsil}
          onChange={handleInputChange}
        />

        <Input
          id="village"
          label="Village:"
          name="location.village"
          value={formData.location.village}
          onChange={handleInputChange}
        />

        <Input
          id="pincode"
          label="Pincode:"
          name="location.pincode"
          value={formData.location.pincode}
          onChange={handleInputChange}
        />

        <Input
          id="latitude"
          label="Latitude:"
          name="location.latitude"
          value={formData.location.latitude}
          onChange={handleInputChange}
        />

        <Input
          id="longitude"
          label="Longitude:"
          name="location.longitude"
          value={formData.location.longitude}
          onChange={handleInputChange}
        />

        <Input
          id="area"
          label="Area:"
          name="location.area"
          value={formData.location.area}
          onChange={handleInputChange}
        />

        <Input
          id="recordHash"
          label="Record Hash:"
          name="recordHash"
          value={formData.recordHash}
          onChange={handleInputChange}
        />

        <Input
          id="price"
          label="Price (in ETH):"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <Input
          id="isForSale"
          label="Is for sale:"
          name="isForSale"
          type="checkbox"
          checked={formData.isForSale}
          onChange={handleInputChange}
          value = ""
        />
        <Input id="Images" type="file" ref={inputRef}
          onChange={handleInputChange}
          accept="image/*,application/pdf" label={'Images'} value={''} />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Record...' : 'Add Record'}
        </button>
        {error && <p>{error?.message}</p>}

      </form>

    </div>
  )
}

export default AddRecord;

