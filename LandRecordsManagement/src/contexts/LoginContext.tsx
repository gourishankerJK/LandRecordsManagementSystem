import { createContext } from 'react';

interface LoginContextType {
    accounts: any;
    contract: any;
    error: string;
    setAccounts: (value : Array<string>) => void;
    setContract: (value : any) => void;
    setError: (value : string) => void;
    connectMetamask : () => void;
    updateMetaMask : ()=> void;
  }
const LoginContext = createContext<LoginContextType>({
    accounts: new Array<string>(),
    contract : "",
    error : "",
    setAccounts: () => {}  ,
    setContract : () =>{},
    setError : ()=>{} ,
    connectMetamask : ()=>{},
    updateMetaMask : ()=>{}
});

export default LoginContext;