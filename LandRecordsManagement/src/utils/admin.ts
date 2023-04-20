export const getAllUsers = async (contract: any, accounts: any) => {
	try {
		const data = await contract.methods
			.getAllUsers()
			.call({ from: accounts[0] });
		return data;
	} catch (er) {
		console.log(er);
	}
};

export const getProfile = async (contract: any, accounts: any) => {
	try {
		const data = await contract.methods
			.getOwnProfile()
			.call({ from: accounts[0] });
		return data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const addOffical = async (
	contract: any,
	accounts: any,
	address: string
) => {
	try {
		await contract.methods
			.addGovernmentOfficial(address)
			.call({ from: accounts[0] });
		await contract.methods
			.addGovernmentOfficial(address)
			.send({ from: accounts[0] });
	} catch (err) {
		console.log(err);
	}
};

export const checkOffical = async (
	contract: any,
	accounts: any,
	address: string
) => {
	try {
		const data = await contract.methods
			.isGovernmentOfficial(address)
			.call({ from: accounts[0] });
		return data;
	} catch (err) {
		console.log(err);
	}
};
