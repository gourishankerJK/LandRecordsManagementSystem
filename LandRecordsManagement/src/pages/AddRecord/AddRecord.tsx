import React, { useState, useContext, useRef } from "react";
import LoginContext from "../../contexts/LoginContext";
import Input from "../../components/common/Input";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import ProfileContext from "../../contexts/ProfileContext";
import { Formik } from "formik";
import addrecordValidationSchema from "../../utils/Validations/Addrecordvalidation";
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


	const submitHandler = async (values: any) => {
		// setLoading(true);
		console.log(values);
		// try {
		// 	await landContract.methods
		// 		.addLandRecord(
		// 			values.name,
		// 			values.mutationNumber,
		// 			values.location,
		// 			values.recordHash,
		// 			values.price,
		// 			values.isForSale
		// 		)
		// 		.call({ from: accounts[0] });
		// 	await landContract.methods
		// 		.addLandRecord(
		// 			values.name,
		// 			values.mutationNumber,
		// 			values.location,
		// 			values.recordHash,
		// 			values.price,
		// 			values.isForSale
		// 		)
		// 		.send({ from: accounts[0] });
		// 	setLoading(false);
		// 	setError(null);
			
		// } catch (err) {
		// 	console.log(err);
		// 	setLoading(false);
		// }
	};

	return (
		<Formik
			validationSchema={addrecordValidationSchema}
			initialValues={{
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
				price: "",
				isForSale: false,
				supportDoc: "",
			}}
			onSubmit={(values) => submitHandler(values)}
		>
			{({
				setFieldValue,
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				isValid,
			}) => (
				<div className="add-record">
					<div className="record-heading">
						<h2 className="heading"> Add a New Land Record</h2>
						<p className="info">
							** Please provide accurate details about the land record you want
							to add. This information will help interested parties to assess
							the land and make informed decisions.
						</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col">
								<Input
									id="name"
									label="Name:"
									name="name"
									value={values.name}
									onChange={handleChange}
								/>
							</div>
							<div className="col">
								<Input
									id="mutationNumber"
									label="Mutation Number:"
									name="mutationNumber"
									value={values.mutationNumber}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<Input
									id="state"
									label="State:"
									name="location.state"
									value={values.location.state}
									onChange={handleChange}
								/>
							</div>
							<div className="col">
								<Input
									id="district"
									label="District:"
									name="location.district"
									value={values.location.district}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<Input
									id="tehsil"
									label="Tehsil:"
									name="location.tehsil"
									value={values.location.tehsil}
									onChange={handleChange}
								/>
							</div>
							<div className="col">
								<Input
									id="village"
									label="Village:"
									name="location.village"
									value={values.location.village}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Input
									id="pincode"
									label="Pincode:"
									name="location.pincode"
									value={values.location.pincode}
									onChange={handleChange}
								/>
							</div>
							<div className="col">
								<Input
									id="longitude"
									label="Longitude:"
									name="location.longitude"
									value={values.location.longitude}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Input
									id="area"
									label="Area:"
									name="location.area"
									value={values.location.area}
									onChange={handleChange}
								/>
							</div>
							<div className="col">
								<Input
									id="latitude"
									label="Latitude:"
									name="location.latitude"
									value={values.location.latitude}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Input
									id="price"
									label="Price (in ETH):"
									name="price"
									value={values.price}
									onChange={handleChange}
								/>
							</div>
							<div className="col">
								<Input
									id="Images"
									type="file"
									onChange={(event) => {
										setFieldValue("supportDoc", event.currentTarget.files[0]);
									}}
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
									checked={values.isForSale}
									onChange={handleChange}
									classes="input-checked"
								/>
							</div>
						</div>
						<button type="submit" disabled={loading} className="btn submit">
							{loading ? "Adding Record..." : "Add Record"}
						</button>
					</form>
				</div>
			)}
		</Formik>
	);
};

export default AddRecord;
