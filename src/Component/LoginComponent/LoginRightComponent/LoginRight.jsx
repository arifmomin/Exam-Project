import React from 'react'
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { RiGlobalLine } from 'react-icons/ri';
import { useTheme } from '../../../Theme/ThemeContext';

const LoginRight = () => {
  const {darkMode} = useTheme(null)
  return (
    <div className='w-[45%] h-full flex flex-col items-center justify-center'>
        <div className='LoginRightBgImage'>
        </div>
        <div className='flex justify-center items-center flex-col'>
        <h2 className='text-6xl text-transparent font-bold mt-10 font-Inkut Fire-Text'>Arif momin</h2>
        <h3 className={`${darkMode? 'text-white' : 'text-black'} text-2xl font-semibold mt-5 font-Inkut`}>Mern Stack Developer</h3>
        </div>
        <div className="w-full flex justify-center items-center mt-[90px]">
            <ul className="wrapper flex justify-center items-center gap-x-3 list-none">
                <li className="icon Facebook relative bg-white rounded-full w-[50px] h-[50px] text-[18px] flex flex-col justify-center items-center cursor-pointer">
                <span className="tooltip-hover absolute top-0 text-sm bg-white text-black px-2 py-[5px] rounded-[5px] opacity-0 pointer-events-none">Facebook</span>
                    <span className='text-[22px] text-[#1877F2] social-icon'><FaFacebookF/></span>
                </li>
                <li className="icon Twitter relative bg-white rounded-full w-[50px] h-[50px] text-[18px] flex flex-col justify-center items-center cursor-pointer">
                <span className="tooltip-hover absolute top-0 text-sm bg-white text-black px-2 py-[5px] rounded-[5px] opacity-0 pointer-events-none">Twitter</span>
                    <span className='text-[22px] text-[#1DA1F2] social-icon'><FaTwitter/></span>
                </li>
                <li className="icon Instagram  relative bg-white rounded-full w-[50px] h-[50px] text-[18px] flex flex-col justify-center items-center cursor-pointer">
                <span className="tooltip-hover absolute top-0 text-sm bg-white text-black px-2 py-[5px] rounded-[5px] opacity-0 pointer-events-none">Instagram</span>
                    <span className='text-[22px] text-white  bg-instagram-gradient social-icon rounded-lg'><FaInstagram/></span>
                </li>
                <li className="icon Github relative bg-white rounded-full w-[50px] h-[50px] text-[18px] flex flex-col justify-center items-center cursor-pointer">
                <span className="tooltip-hover absolute top-0 text-sm bg-white text-black px-2 py-[5px] rounded-[5px] opacity-0 pointer-events-none">Github</span>
                    <span className='text-[22px] text-[#181717] social-icon'><FaGithub/></span>
                </li>
                <li className="icon Youtube  relative bg-white rounded-full w-[50px] h-[50px] text-[18px] flex flex-col justify-center items-center cursor-pointer">
                <span className="tooltip-hover absolute top-0 text-sm bg-white text-black px-2 py-[5px] rounded-[5px] opacity-0 pointer-events-none">Website</span>
                    <span className='text-[22px] text-blue-500 social-icon'><RiGlobalLine/></span>
                </li>
            </ul>
        </div>

    </div>
  )
}

export default LoginRight