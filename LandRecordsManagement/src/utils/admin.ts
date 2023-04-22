import { toast } from "react-toastify";
import { wrapper } from "./wrapper";

export const getAllUsers = wrapper(async (contract: any, accounts: any) => {
	const data = await contract.methods.getAllUsers().call({ from: accounts[0] });
	return data;
});

export const getProfile = wrapper(async (contract: any, accounts: any) => {
	const data = await contract.methods
		.getOwnProfile()
		.call({ from: accounts[0] });
		console.log(data);
	return data;
});

export const addOffical = wrapper(
	async (contract: any, accounts: any, address: string) => {
		await contract.methods
			.addGovernmentOfficial(address)
			.call({ from: accounts[0] });
		await contract.methods
			.addGovernmentOfficial(address)
			.send({ from: accounts[0] });
		toast.success("Offical added!");
	}
);

export const checkOffical = wrapper(
	async (contract: any, accounts: any, address: string) => {
		const data = await contract.methods
			.isGovernmentOfficial(address)
			.call({ from: accounts[0] });
		return data;
	}
);

export const removeOffical = wrapper(async (contract, accounts, address) => {
	await contract.methods
		.removeGovernmentOfficial(address)
		.call({ from: accounts[0] });
	await contract.methods
		.removeGovernmentOfficial(address)
		.send({ from: accounts[0] });

	toast.success("Official removed sucessfully");
});

export const isAdmin = wrapper(async (contract: any, accounts: any) => {
	const data = await contract.methods.isAdmin().call({ from: accounts[0] });
	return data;
});
