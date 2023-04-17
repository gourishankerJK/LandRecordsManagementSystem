import React, { useState } from 'react';
import LoginContext from './LoginContext';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import landAbiFile from '../contract/LandManagementSystem.json';
import userAbiFile from '../contract/UserRecords.json';
import contractAdress from '../contract/MyContract_address.json';

interface CustomWindow extends Window {
  ethereum?: any;
}

interface LoginProviderProps {
  children: React.ReactNode;
}
function LoginProvider(props: LoginProviderProps): JSX.Element {
  const [accounts, setAccounts] = useState<string[]>();
  const [landContract, setLandContract] = useState<Web3.eth.Contract>();
  const [userContract, setUserContract] = useState<Web3.eth.Contract>();
  const [error, setError] = useState<string>('');

  const connectMetamask = async (): Promise<void> => {
    const customWindow = window as CustomWindow;
    if (customWindow.ethereum) {
      try {
        await customWindow.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(customWindow.ethereum);
        const accounts = await web3.eth.getAccounts();
        const lcontract = new web3.eth.Contract(landAbiFile.abi as AbiItem[], contractAdress.Land_address);
        const ucontract = new web3.eth.Contract(userAbiFile.abi as AbiItem[], contractAdress.User_address);
        setAccounts(accounts);
        setLandContract(lcontract);
        setUserContract(ucontract);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError('Metamask not found');
    }
  };

  const updateMetaMask = async (): Promise<void> => {
    const customWindow = window as CustomWindow;
    if (customWindow.ethereum && customWindow.ethereum.selectedAddress) {
      try {
        const web3 = new Web3(customWindow.ethereum);
        const lcontract = new web3.eth.Contract(landAbiFile.abi as AbiItem[], contractAdress.Land_address);
        const ucontract = new web3.eth.Contract(userAbiFile.abi as AbiItem[], contractAdress.User_address);
      
        setAccounts([customWindow.ethereum.selectedAddress]);
        setLandContract(lcontract);
        setUserContract(ucontract);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isAuthenticated = (): boolean => {
    const customWindow = window as CustomWindow;
    return Boolean(customWindow.ethereum && customWindow.ethereum.selectedAddress);
  };

  return (
    <LoginContext.Provider
      value={{ accounts, landContract, userContract, error, setAccounts, setLandContract, setUserContract, setError, connectMetamask, updateMetaMask, isAuthenticated }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
