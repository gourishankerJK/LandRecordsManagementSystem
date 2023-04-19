export const addProfile = async (contract, address, obj) => {
    try {
        await contract.methods.addUser(obj.name, obj.dateOfBirth, obj.aadharNumber, obj.profilePhoto, obj.officialDocument).call({ from: address[0] });
        await contract.methods.addUser(obj.name, obj.dateOfBirth, obj.aadharNumber, obj.profilePhoto, obj.officialDocument).send({ from: address[0] });
    }
    catch (err) {
        console.log(err.message);
    }

}
