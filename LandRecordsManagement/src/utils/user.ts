import { toast } from "react-toastify";
import { wrapper } from "./wrapper";

export const addProfile = wrapper(async (contract, address, obj) => {
	await contract.methods
		.addUser(
			obj.name,
			obj.dateOfBirth,
			obj.aadharNumber,
			obj.profilePhoto,
			obj.officialDocument
		)
		.call({ from: address[0] });
	await contract.methods
		.addUser(
			obj.name,
			obj.dateOfBirth,
			obj.aadharNumber,
			obj.profilePhoto,
			obj.officialDocument
		)
		.send({ from: address[0] });
	toast.success("Profile added sucessfully!");
});

export const getUsingAadharNumber = wrapper(async (contract , address , aadharNumber )=>{
	return await contract.methods.getUsingAadharNumber(aadharNumber).call({ from: address[0] });
})
