import React, { useState } from 'react';
import ProfileContext from './ProfileContext';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import userAbiFile from '../contract/UserRecords.json';
import contractAdress from '../contract/MyContract_address.json';

interface CustomWindow extends Window {
  ethereum?: any;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}
function ProfileProvider(props: ProfileProviderProps): JSX.Element {
  const [accounts, setAccounts] = useState<string[]>();

  const [userContract, setUserContract] = useState<Web3["eth"]["Contract"]>();
  const [error, setError] = useState<string>('');

  const connectMetamask = async (): Promise<void> => {
    const customWindow = window as CustomWindow;
    if (customWindow.ethereum) {
      try {
        await customWindow.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(customWindow.ethereum);
        const accounts = await web3.eth.getAccounts();
        const ucontract = new web3.eth.Contract(userAbiFile.abi as AbiItem[], contractAdress.User_address);
        setAccounts(accounts);
        setUserContract(ucontract);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError('Metamask not found');
    }
  };

  return (
    <ProfileContext.Provider
      value={{ accounts, userContract, error, setAccounts, setUserContract, setError, connectMetamask }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
