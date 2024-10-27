import React from "react";
import { useTheme } from "./ThemeContext";
import { FaSun } from 'react-icons/fa';
import { MdNightlight } from 'react-icons/md';

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className=" absolute top-5 right-5 z-50" onClick={toggleTheme}>
    <button className={` ${!darkMode ? 'justify-start; bg-white shadow-button-Day-shadow' : 'justify-end bg-[#2b2b2b] shadow-button-night-shadow'} w-[60px] h-8 rounded-[20px] flex items-center px-1`}>
      {!darkMode? (
    <span className={`${!darkMode? 'day-rotate' : ''}  w-[25px] h-[25px] text-[#FFDE59] text-base flex justify-center items-center rounded-full bg-white shadow-day-span-shadow`}><FaSun/></span>
      ) : (
        <span className={`${!darkMode? '' : 'rotate'}  w-[25px] h-[25px] transform rotate-[340deg] text-[#FFDE59] text-base flex justify-center items-center rounded-full bg-black shadow-night-span-shadow`}><MdNightlight/></span>
      )
    }
    </button>
    </div>
  );
};

export default DarkModeToggle;

