import { wrapper } from "./wrapper";

export const getTransactionHistory = wrapper(async (contract , accounts )=>{
        const data = await contract.methods.getTransactionHistory().call({from : accounts[0]})
        let temp = data.map((item)=>{
               return {...item , date : (new Date(item.date * 1000)).toLocaleDateString()}
        });
        console.log(temp);
        return temp;
        
});