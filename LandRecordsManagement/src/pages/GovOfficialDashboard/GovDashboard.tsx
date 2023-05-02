import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import GovRecords from "../../components/Records/GovRecords";

import LoginContext from "../../contexts/LoginContext";
import { getAllUsers } from "../../utils/admin";
import { Loader } from "../../components";
import { getLandRecordsExceptForCurrentUser } from "../../utils/lands";
import { Verified } from "../../assets";
import { getTransactionHistory } from "../../utils/transactions";
import Records from "../../components/Records/Records";

export interface UserRecord {
	name: string;
	dateOfBirth: string;
	aadharNumber: string;
	profilePhoto: string;
	officialDocument: string;
	isVerified: boolean;
	my: string;
}

export interface UserInfo {
	aadharNumber: string;
	name: string;
}

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

export interface LandInfo {
	mutationNumber: string;
	name: string;
}

const GovDashboard = () => {
	const { accounts, userContract, landContract, transContract } =
		useContext(LoginContext);
	const [userRecords, setUserRecords] = useState<UserRecord[]>([]);
	const [landRecords, setLandRecords] = useState<LandRecord[]>([]);
	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(false);
	const [transactionData, setTransactionData] = useState([]);

	const getRecords = async () => {};

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { errors: uErros, result: userRecords } = await getAllUsers(
				userContract,
				accounts
			);
			const { errors: lErrors, result: landRecords } = await getLandRecordsExceptForCurrentUser(
				landContract,
				accounts
			);
			const { errors: transErrors, result: transaction } =
				await getTransactionHistory(transContract, accounts);
			if (!transErrors) {
				let temp = transaction.filter((t) => parseInt(t.to, 16) !== 0);
				setTransactionData(temp);
			}
			if (!uErros) setUserRecords(userRecords);
			if (!lErrors) setLandRecords(landRecords);
			console.log(userRecords, landRecords);
			setLoading(false);
		})();
	}, [userContract, landContract, update]);

	let userHeading = [
		["AadharNumber", "aadharNumber"],
		["Name", "name"],
		["Verified", "isVerified"],
		["Details", "view"],
	];
	let landHeading = [
		["Mutation Number", "mutationNumber"],
		["Owner", "name"],
		["Verified", "isVerified"],
		["Details", "view"],
	];
	let trasactionHeading = [
		["Sender", "from"],
		["Reciever", "to"],
		["Type of Transaction", "typeOf"],
		["Desp", "description"],
		["Date", "date"],
		["", ""],
	];

	if (loading) return <Loader />;
	return (
		<div id="user-dashboard">
			<div className="content">
				<div className="grid2">
					<div className="col-1">
						<GovRecords
							heading={userHeading}
							title={"Users"}
							item={userRecords}
							update={update}
							setUpdate={setUpdate}
						/>
					</div>
					<div className="col-2">
						<GovRecords
							heading={landHeading}
							title={"Lands"}
							item={landRecords}
							update={update}
							setUpdate={setUpdate}
						/>
					</div>
				</div>
			</div>
			<Records
				heading={trasactionHeading}
				title={"Transactions"}
				item={transactionData}
				update={update}
				setUpdate={setUpdate}
			/>
		</div>
		// <div><p>This are coming up soon!</p></div>
	);
};

export default GovDashboard;
