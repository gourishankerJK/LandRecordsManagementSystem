

export const  getAllUsers = async (contract :any, accounts :any)=>{
       const data =  await contract.methods.getAllUsers().call({from : accounts[0]});
       let officals = [];
       let user = [];
       console.log(data);
       
}