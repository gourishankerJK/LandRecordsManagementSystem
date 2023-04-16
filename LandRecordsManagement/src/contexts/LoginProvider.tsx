import React, { useState } from 'react';
import LoginContext from './LoginContext';
import Web3 from "web3";
import abiFile from "../contract/LandManagementSystem.json";
import contractAdress from "../contract/MyContract_address.json";


function LoginProvider(props : any) {
    const [accounts, setAccounts] = useState<Array<string>>();
	const [contract, setContract] = useState();
    const [error , setError] = useState('');
    const connectMetamask = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          const contract = new web3.eth.Contract(abiFile['abi'], contractAdress.address);
          setAccounts(accounts);
          setContract(contract);
        } catch (error) {
          console.error(error);
        }
      } else {
        setError("Metamask not found");
      }
    };

    const updateMetaMask = async ()=>{
      if (window.ethereum && window.ethereum.selectedAddress) {
        try {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(abiFile['abi'], contractAdress.address);
          setAccounts([window.ethereum.selectedAddress]);
          setContract(contract);

        } catch (error) {
          console.error(error);
        }
      } 
    }



  return (
    <LoginContext.Provider value={{ accounts , contract , error, setAccounts , setContract , setError , connectMetamask ,updateMetaMask }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;