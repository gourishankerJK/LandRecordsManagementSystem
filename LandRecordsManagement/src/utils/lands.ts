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

export const buyLand = wrapper(
	async (contract, accounts, web3, mutationNumber, price) => {
		await contract.methods.buyLand(mutationNumber).call({
			from: accounts[0],
			value: web3.utils.toWei(price.toString(), "ether"),
		});
		await contract.methods.buyLand(mutationNumber).send({
			from: accounts[0],
			value: web3.utils.toWei(price.toString(), "ether"),
		});

		toast.success("Successfully bought the land");
	}
);

export const sellLand = wrapper(
	async (contract, accounts, mutationNumber, price) => {
		await contract.methods.sellLand(mutationNumber, price).call({
			from: accounts[0],
		});
		await contract.methods.sellLand(mutationNumber, price).send({
			from: accounts[0],
		});

		toast.success("Land Successfully put up for the Sale");
	}
);

export const getLandRecordsExceptForCurrentUser = wrapper(
	async (contract: any, accounts: any) => {
		const data = await contract.methods
			.getLandRecordsExceptForCurrentUser()
			.call({ from: accounts[0] });
		return data;
	}
);


export const updateDocument = wrapper(async (contract , accounts , cid, mutationNumber)=>{
		await contract.methods.updateDocument(cid,mutationNumber).call({from : accounts[0]});
		await contract.methods.updateDocument(cid,mutationNumber).send({from : accounts[0]});
})
export const getVerifiedLandRecordsForCurrentUser = wrapper(async (contract , accounts)=>{
	  return await contract.methods.getVerifiedLandRecordsForCurrentUser(accounts[0]).call({from : accounts[0]});
})

export const rejectLandRecord = wrapper(async (contract , accounts , mutationNumber)=>{
	await contract.methods.rejectLandRecord(mutationNumber).call({from : accounts[0]});
	await contract.methods.rejectLandRecord(mutationNumber).send({from : accounts[0]});
	toast.success("Record Rejected");
})

export const getMyLandRecords = wrapper(_getMyLandRecords);
export const getAllLands = wrapper(_getAllLands);
export const addLandRecord = wrapper(_addLandRecord);
