

export const  getAllUsers = async (contract :any, accounts :any)=>{
       const data =  await contract.methods.getAllUsers().call({from : accounts[0]});
       let officals = [];
       let user = [];
       console.log(data);
       
}

export const getProfile = async (contract , accounts)=>{
       try{
            const data = await contract.methods.getOwnProfile().call({from : accounts[0]});
            return data;
       }
       catch(err){
              return null;
       }
}