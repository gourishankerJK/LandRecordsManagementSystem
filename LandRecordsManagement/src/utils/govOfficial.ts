export const verifyUser = async (
	contract: any,
	accounts: any,
	address: string
) => {
	try {
		await contract.methods
			.verifyUser(address)
			.call({ from: accounts[0] });
		await contract.methods
			.verifyUser(address)
			.send({ from: accounts[0] });
	} catch (err) {
		console.log(err);
	}
};