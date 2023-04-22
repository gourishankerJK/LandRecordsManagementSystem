import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../../contexts/LoginContext";
import { Verified } from "../../assets";
import "./style.scss";
import Records from "../../components/Rcords/Records";
import TransectionHistory from "../../components/TransectionHistory/TransectionHistory";
import Input from "../../components/common/Input";
import { getAllLands, transferOwnerShip } from "../../utils/lands";
import { getMyLandRecords } from "../../utils/lands";
import { Formik } from "formik";
import { transferOwnerValidationSchema } from "../../utils/Validations/TransferOwnerShip";
import { getUsingAadharNumber } from "../../utils/user";

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
	let recordHeading = [
		["Mutation Number", "mutationNumber"],
		["Name", "name"],
		["Price", "price"],
		["Status", "isVerified"],
		["Availibity", "Isforsale"],
		["", ""],
	];
	let trasactionHeading = [
		["Sender", "from"],
		["Reciever", "to"],
		["Mutation Number", "mutationNumber"],
		["Amount", "amount"],
		["Date", "date"],
		["", ""],
	];

	const { landContract, accounts, userContract } = useContext(LoginContext);

	const [allLands, setAllLands] = useState([]);
	const [currentUserVerifiedLand, setCurrentUserVerifiedLand] = useState([]);
	const [transactionData, setTransactionData] = useState([]);

	const handleSubmitT = (values) => {
		console.log('result', values);
		(async () => {
			const { errors, result } = await getUsingAadharNumber(
				userContract,
				accounts , 
				values.aadharNumber
			);
			
			if (!errors) {
				values.aadharNumber = result;
				await transferOwnerShip(landContract, accounts, values);
			}
		})();
	};

	useEffect(() => {
		(async () => {
			const { errors: landError, result: lands } = await getAllLands(
				landContract,
				accounts
			);
			const { errors: myLandError, result: myLands } = await getMyLandRecords(
				landContract,
				accounts
			);
			if (!myLandError) {
				const myVerifiedLands = myLands.filter((item) => {
					if (item.isVerified) return item;
				});
				setCurrentUserVerifiedLand(myVerifiedLands);
			}
			if (!landError) setAllLands(lands);
		})();
	}, [accounts]);

	return (
		<div id="user-dashboard">
			<div className="content">
				<div className="grid2">
					<div className="col-1">
						<Records
							heading={recordHeading}
							title={"Available Lands"}
							item={allLands}
						/>
					</div>
					<div className="col-2">
						<Records
							heading={trasactionHeading}
							title={"Transaction History"}
							item={transactionData}
						/>
					</div>
				</div>

				<div className="transfer">
					<Formik
						validationSchema={transferOwnerValidationSchema}
						initialValues={{ mutationNumber: "", aadharNumber: "" }}
						onSubmit={(values)=> handleSubmitT(values)}
					>
						{({ values, handleSubmit, handleChange, errors, isSubmitting }) => (
							<form onSubmit={handleSubmit} className="transfer-form">
								<h1 className="header">Transfer Ownership</h1>
								<div className="form-inputs">
									<div className="form-content">
										<label htmlFor="mutationNumber">
											Mutation Number of Land
										</label>
										<select
											value={values.mutationNumber}
											name="mutationNumber"
											id="mutationNumber"
											onChange={handleChange}
										>
											<option value="">Select Mutation Number</option>
											{currentUserVerifiedLand.map((land) => {
												return (
													<option
														key={land.mutationNumber}
														value={land.mutationNumber}
													>
														{land.mutationNumber}
													</option>
												);
											})}
										</select>
										{errors.mutationNumber && (
											<div className="input-feedback">
												{errors.mutationNumber}
											</div>
										)}
									</div>
									<div className="form-content">
										<Input
											id="aadharNumber"
											name="aadharNumber"
											label="Aadhar Number of Reciever"
											value={values.aadharNumber}
											type="text"
											onChange={handleChange}
											errors={errors}
										/>
									</div>
								</div>
								<button
									type="submit"
									className={isSubmitting ? "submit" : "submit"}
								>
									Transfer OwnerShip
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
