import React, { useState, useContext, useRef } from "react";
import LoginContext from "../../contexts/LoginContext";
import Input from "../../components/common/Input";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import ProfileContext from "../../contexts/ProfileContext";

const AddRecord = () => {
  const { accounts, landContract, userContract } = useContext(LoginContext);
  const { userProfile, updateProfile, profilePhoto, setProfilePhoto } =
    useContext(ProfileContext);
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
    isForSale: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    } else if (name.startsWith("location.")) {
      const field = name.substring(9); // remove "location." from name
      setFormData((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [field]: value,
        },
      }));
    } else {
      console.log([name], value);
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    console.log(formData);
    try {
      await landContract.methods
        .addLandRecord(
          formData.name,
          formData.mutationNumber,
          formData.location,
          formData.recordHash,
          formData.price,
          formData.isForSale
        )
        .call({ from: accounts[0] });
      await landContract.methods
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
        isForSale: false,
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="add-record">
      <div className="record-heading">
        <h2 className="heading"> Add a New Land Record</h2>
        <p className="info">
          ** Please provide accurate details about the land record you want to add.
          This information will help interested parties to assess the land and
          make informed decisions.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <Input
              id="name"
              label="Name:"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <Input
              id="mutationNumber"
              label="Mutation Number:"
              name="mutationNumber"
              value={formData.mutationNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              id="state"
              label="State:"
              name="location.state"
              value={formData.location.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <Input
              id="district"
              label="District:"
              name="location.district"
              value={formData.location.district}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Input
              id="tehsil"
              label="Tehsil:"
              name="location.tehsil"
              value={formData.location.tehsil}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <Input
              id="village"
              label="Village:"
              name="location.village"
              value={formData.location.village}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              id="pincode"
              label="Pincode:"
              name="location.pincode"
              value={formData.location.pincode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <Input
              id="longitude"
              label="Longitude:"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              id="area"
              label="Area:"
              name="location.area"
              value={formData.location.area}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <Input
              id="recordHash"
              label="Record Hash:"
              name="recordHash"
              value={formData.recordHash}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              id="price"
              label="Price (in ETH):"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <Input
              id="Images"
              type="file"
              onChange={handleInputChange}
              name="files"

              accept="image/*,application/pdf"
              label={"Supporting Documents (PDF ONLY)"}
              value={""}
            />

          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input
              id="isForSale"
              label="Is for sale:"
              name="isForSale"
              type="checkbox"
              checked={formData.isForSale}
              onChange={handleInputChange}
              classes="input-checked"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn submit">
          {loading ? "Adding Record..." : "Add Record"}
        </button>
      </form>
    </div>
  );
};

export default AddRecord;
