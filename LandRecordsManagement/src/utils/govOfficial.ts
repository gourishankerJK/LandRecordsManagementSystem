import { toast } from "react-toastify";
import { wrapper } from "./wrapper";

export const verifyUser = wrapper(
	async (contract: any, accounts: any, address: string) => {
		await contract.methods.verifyUser(address).call({ from: accounts[0] });
		await contract.methods.verifyUser(address).send({ from: accounts[0] });
		toast.success("User Verification sucessfull");
	}
);

export const verifyLand = wrapper(
	async (contract: any, accounts: any, land_id: string) => {
		await contract.methods
			.verifyLandRecord(land_id)
			.call({ from: accounts[0] });
		await contract.methods
			.verifyLandRecord(land_id)
			.send({ from: accounts[0] });
			toast.success("Land Verification sucessfull");
	}
);
