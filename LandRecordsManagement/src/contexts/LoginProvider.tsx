
import React, { useState } from 'react';
import LoginContext from './LoginContext';
import Web3 from 'web3';
import abiFile from '../contract/LandManagementSystem.json';
import contractAdress from '../contract/MyContract_address.json';

interface LoginProviderProps {
  children: React.ReactNode;
}

function LoginProvider(props: LoginProviderProps): JSX.Element {
  const [accounts, setAccounts] = useState<string[]>();
  const [contract, setContract] = useState<Web3.eth.Contract>();
  const [error, setError] = useState<string>('');

  const connectMetamask = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abiFile.abi, contractAdress.address);
        setAccounts(accounts);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError('Metamask not found');
    }
  };

  const updateMetaMask = async (): Promise<void> => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abiFile.abi, contractAdress.address);
        setAccounts([window.ethereum.selectedAddress]);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isAuthenticated = (): boolean => {
    return Boolean(window.ethereum && window.ethereum.selectedAddress);
  };


  const handleLogout = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.send({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <LoginContext.Provider
      value={{ accounts, contract, error, setAccounts, setContract, setError, connectMetamask, updateMetaMask, isAuthenticated ,handleLogout }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
