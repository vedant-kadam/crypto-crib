import React from 'react'
import { BsShieldCheck } from 'react-icons/bs'
import {BiSearchAlt} from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import ServiceCard from './misc/ServiceCard';

const Services = () => {
  return <>
      <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
              Services that we <br />
                continue to improve
            </h1>

          </div>
        </div>
        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color='bg-[#2952e3]'
            title="Security Guranteed"
            icons={<BsShieldCheck fontSize={21} className='text-white'/>}
            subtitle = 'Security and Reliability is at your command '
          />
           <ServiceCard
            color='bg-[#8945f8]'
            title="Best Exchange Rate"
            icons={<BiSearchAlt fontSize={21} className='text-white'/>}
            subtitle = 'Security and Reliability is at your command '
          />
           <ServiceCard
            color='bg-[#f84550]'
            title="Best Deals and Fast Transaction"
            icons={<RiHeart2Fill fontSize={21} className='text-white'/>}
            subtitle = 'Security and Reliability is at your command '
          />
        </div>
      </div>
  </>
}

export default Services