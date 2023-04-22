import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import Records from "../../components/Rcords/GovRecords";
import LoginContext from "../../contexts/LoginContext";
import { getAllUsers } from "../../utils/admin";
import { Loader } from "../../components";
import { getAllLands } from "../../utils/lands";
import { Verified } from "../../assets";

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
	const { accounts, userContract, landContract } = useContext(LoginContext);
	const [userRecords, setUserRecords] = useState<UserRecord[]>([]);
	const [landRecords, setLandRecords] = useState<LandRecord[]>([]);
	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(false);

	const getRecords = async () => {
	};
	
	useEffect(() => {
		(async ()=> {setLoading(true);
		const {errors : uErros , result : userRecords} = await getAllUsers(userContract, accounts);
		const {errors : lErrors , result : landRecords} = await getAllLands(landContract, accounts);
		if(!uErros) setUserRecords(userRecords);
		if(!lErrors) setLandRecords(landRecords);
		console.log(userRecords , landRecords)
		setLoading(false);})();
		
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

	if (loading) return <Loader />;
	return (
		<div id="user-dashboard">
			<div className="content">
				<div className="grid2">
					<div className="col-1">
						<Records
							heading={userHeading}
							title={"Users"}
							item={userRecords}
							update={update}
							setUpdate={setUpdate}
						/>
					</div>
					<div className="col-2">
						<Records
							heading={landHeading}
							title={"Lands"}
							item={landRecords}
							update={update}
							setUpdate={setUpdate}
						/>
					</div>
				</div>
			</div>
		</div>
		// <div><p>This are coming up soon!</p></div>
	);
};

export default GovDashboard;
