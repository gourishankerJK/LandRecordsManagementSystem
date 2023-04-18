import { createContext } from 'react';

interface ProfileContextType {
    accounts: any;
    userContract : any;
    error: string;
    setAccounts: (value : Array<string>) => void;
    setUserContract: (value : any) => void;
    setError: (value : string) => void;
    connectMetamask : () => void;
  }
const LoginContext = createContext<ProfileContextType>({
    accounts: new Array<string>(),
    userContract : "",
    error : "",
    setAccounts: () => {}  ,
    setUserContract : () =>{},
    setError : ()=>{} ,
    connectMetamask : ()=>{},
});

export default ProfileContext;