import { createContext } from 'react';
import web3 from "web3"

interface LoginContextType {
    accounts: any;
    landContract: any;
    userContract : any;
    transContract : any;
    error: string;
    web3 : any;
    setAccounts: (value : Array<string>) => void;
    setLandContract: (value : any) => void;
    setUserContract: (value : any) => void;
    setError: (value : string) => void;
    connectMetamask : () => void;
    updateMetaMask : ()=> void;
    isAuthenticated : ()=> boolean;
  }
const LoginContext = createContext<LoginContextType>({
    accounts: new Array<string>(),
    landContract : "",
    userContract : "",
    transContract : "",
    error : "",
    web3 : "", 
    setAccounts: () => {}  ,
    setLandContract : () =>{},
    setUserContract : () =>{},
    setError : ()=>{} ,
    connectMetamask : ()=>{},
    updateMetaMask : ()=>{},
    isAuthenticated : ()=> false,
});

export default LoginContext;