import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import dummyData from '../utils/dummyData'
import { shortenAddress } from '../utils/shortenAddress'
import TransactionCard from './misc/TransactionCard'
import useFetch from '../Hooks/useFetch'
const Transaction = () => {
  
  const {currentAccount,transactions} = useContext(TransactionContext);

  return (
     <>
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
          <div className="flex flex-col md:p-12 py-12 px-4">
            {/* //if acc is connected then we display data  else propt the user to connect the account */}
            {currentAccount ? (
              <h3 className='text-white text-3xl text-center my-2'>Latest Transaction</h3>
            ):(
              <h3 className='text-white text-3xl text-center my-2'>Connect your Account to see the latest  transaction</h3>
            )}
            <div className="flex flex-wrap justify-center items-center mt-10">
              {transactions.reverse().map((transaction,index)=>{
                return <TransactionCard key={index} {...transaction }/>
              })}
            </div>
          </div>
      </div>
     </>
  )
}

export default Transaction