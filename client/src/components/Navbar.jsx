import React, { useState } from 'react';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import logo from '../../Images/Crypto.png';
import tempLogo from '../../Images/logo.png'
import NavbarData from './Data/NavbarData';
import NavbarItem from './NavbarItem';


const Navbar = () => {

      const [toggleMenu,setToggleMenu] = useState(false);

  return (
      <nav className="w-full flex md:justify-center justify-between items-center p-4" >
          <div className="md:flex flex-initial justify-center">
            {/* <img src={tempLogo} alt="logo" className='w-32 cursor-pointer' /> */}
            <img src={logo} alt="logo" className='w-5/12 cursor-pointer ' />
           
          </div>
          {/* <ul className="text-orange-500 md:flex hidden list-none flex-row justify-between items-center flex-initial ">
              {NavbarData.map((item,index)=> <NavbarItem key={item + index} title ={item}/>)}
              <li className="text-white bg-[#ff7b00] py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg-[#ff9634]" >
                Login
              </li>
          </ul>
          <div className="flex relative" >
              {
                toggleMenu ? 
                <AiOutlineClose fontSize={28} className=" text-orange-500 md:hidden cursor-pointer" onClick= {()=>setToggleMenu(false)} /> :
                <HiMenuAlt4 fontSize={28} className=" text-orange-500 md:hidden cursor-pointer" onClick= {()=>setToggleMenu(true)} />
              } 
 
              {toggleMenu && (
                <ul
                  className='z-10 fixed top-0 right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end rounded-md blue-glassmorphism text-orange-600 animate-slide-in
                  '
                >
                  <li className="text-xl w-full my-2">
                      <AiOutlineClose className='text-orange-500' onClick={()=>setToggleMenu(false)}/>
                  </li>
                  {NavbarData.map((item,index)=> <NavbarItem key={item + index} title ={item} classProp="my-2 text-lg"/>)}
                </ul>
              )} 

           </div> */}


      </nav>
  )
}

export default Navbar