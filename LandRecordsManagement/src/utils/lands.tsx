
export const addLandRecord = async (contract:any , accounts:any , values:any)=>{
    try {
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
      
    } catch (err) {
        console.log(err);
       
    }
};