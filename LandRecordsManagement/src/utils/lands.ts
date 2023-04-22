import { toast } from "react-toastify";
import { wrapper } from "./wrapper";

const _addLandRecord = async (contract: any, accounts: any, values: any) => {
	await contract.methods
		.addLandRecord(
			values.name,
			values.mutationNumber,
			values.location,
			values.cid,
			values.price,
			values.isForSale
		)
		.call({ from: accounts[0] });
	await contract.methods
		.addLandRecord(
			values.name,
			values.mutationNumber,
			values.location,
			values.cid,
			values.price,
			values.isForSale
		)
		.send({ from: accounts[0] });
	toast.success("New land record added");
};

export const _getMyLandRecords = async (contract: any, accounts: any) => {
	const data = await contract.methods
		.getLandRecordsForCurrentUser()
		.call({ from: accounts[0] });
	return data;
};

const _getAllLands = async (contract: any, accounts: any) => {
	const data = await contract.methods
		.getAllLandRecords()
		.call({ from: accounts[0] });
	return data;
};

export const transferOwnerShip = wrapper(async (contract, accounts, obj) => {
	console.log(obj.mutationNumber, obj.aadharNumber);
	await contract.methods
		.transferOwnership(obj.mutationNumber, obj.aadharNumber)
		.call({ from: accounts[0] });
	await contract.methods
		.transferOwnership(obj.mutationNumber, obj.aadharNumber)
		.send({ from: accounts[0] });

	toast.success("Ownership transferred sucesfully");
});
export const getMyLandRecords = wrapper(_getMyLandRecords);
export const getAllLands = wrapper(_getAllLands);
export const addLandRecord = wrapper(_addLandRecord);
