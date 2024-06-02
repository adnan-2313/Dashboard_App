import React from 'react'
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  return (
    <>
     <nav className='max-lg:w-[100%] font-montserrat flex flex-col w-full bg-[#292929] '>
        <ul className='flex flex-row h-[50px] text-white relative  flex-start  shadow-black shadow-lg'>
        
            <li className="pl-[20px] flex flex-row text-[30px]"><MdDashboard className="text-[46px]"/>Dashboard</li>
        </ul>
     </nav> 
    </>
  )
}

export default Navbar
