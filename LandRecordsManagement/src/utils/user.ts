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


export const transferOwnerShip = wrapper(async (contract , accounts , obj)=>{
      await contract.methods.transferOwnership().call({from : accounts[0]});
      await contract.methods.transferOwnership().send({from : accounts[0]})

})