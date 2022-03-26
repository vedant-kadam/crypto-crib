import React, { createContext,useContext, useEffect, useState } from "react";
import {ethers} from 'ethers'
import { contractABI,contractAddress } from "../utils/constants";

export const TransactionContext =  createContext();

const {ethereum} = window;

const getEtheriumContract =  ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //used to fetch out contract
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);
    console.log({
        provider,
        signer,
        transactionContract


    });
    return transactionContract;
}

export const TransactionProvider = ({children})=>{


    const [currentAccount,setCurrentAccount] =  useState("");
    const [formData,setFormData] = useState(
        {
            addressTo:"",
            amount:"",
            keyword:"",
            message:""
        }
    )
    const [transactions,setTransactions] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e,name)=>{
        setFormData((prevState)=>({
            ...prevState, [name]:e.target.value
        }));
    }

    const getAllTransaction = async ()=>{
        try{
            if(!ethereum) return alert ("please install metamask");
            
            const transactionsContract = getEtheriumContract();

            const availableTransactions = await transactionsContract.getAllTransactions();
            console.log(availableTransactions);
            console.log("Get All Transaction Success");
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
            console.log(structuredTransactions);
              setTransactions(structuredTransactions);
        }
        catch(error){
            console.log("Error in getAllTransaction");
        }
    }

    //check if account is connected at the startr
    const checkIfWalletIsConnected = async ()=>{

        try{
            if(!ethereum) return alert("please install metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});
            console.log(accounts);
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                //get all the transaction
                getAllTransaction();
            }else{
                console.log("No Account found");
            }
        }
        catch(error)
        {
            throw new Error("No Etherium object");

        }
       
    }
    

    const checkIfTransactionExist = async()=>{
        try{
          const transactionContract =  getEtheriumContract();
          const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount",transactionCount);
        }
        catch(error)
        {
            console.log(error);
            throw new Error("No Etherium object");
        }
    }

    //connect to the wallet
    const connectWallet = async()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            
        }catch(error)
        {
            console.log(error);
            throw new Error("No Etherium object");
        }
    }

    //send Trasaction
    const sendTransaction = async ()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            //get the data from the form 
            const {addressTo,amount,keyword,message} = formData;
          const transactionContract =  getEtheriumContract();
          const parsedAmount = ethers.utils.parseEther(amount);

          await ethereum.request({
              method:'eth_sendTransaction',
              params:[{
                  from:currentAccount,
                  to:addressTo,
                  gas:'0x5208', //21000 GWEI
                  value:parsedAmount._hex,

              }]
          });
          

          const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
          setIsLoading(true);
          console.log(`loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          setIsLoading(false);
          console.log(`success -${transactionHash.hash}`);

          const transactionCount = await transactionContract.getTransactionCount();
          setTransactionCount(transactionCount.toNumber());
          window.reload();
        }
        catch(error)
        {
            console.log("No Ethereum Found");
        }
    }

    useEffect (()=>{
     checkIfWalletIsConnected();   
     checkIfTransactionExist();
    },[]);

    return <TransactionContext.Provider value={{
        transactionCount,
        connectWallet,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        transactions,
        

    }}>
        {children}
    </TransactionContext.Provider>
}