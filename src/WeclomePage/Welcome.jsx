import { useRef, useState } from 'react';
import logo from './welcomeimage/image.png'
import { FaFacebookF, FaInstagram, FaMinus, FaPlus, FaTwitter } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx';
import { useTheme } from '../Theme/ThemeContext';
import DarkLogo from './welcomeimage/darkmodeLogo.png'
import { Link } from 'react-router-dom';
const Welcome = () => {
    const {darkMode} = useTheme();
    const [showIcons, setShowIcons] = useState(false);
    const [showIconstwo, setShowIconstwo] = useState(false);
    const [showIconsThree, setShowIconsThree] = useState(false);
    const [showIconsfour, setShowIconsfour] = useState(false);

    const handleSocialIcon = () => {
        setShowIcons(!showIcons);
    };

  return (
    <div className={` ${!darkMode? 'bg-white' : 'Night-Background'} w-full h-screen flex flex-col justify-center items-center`}>
        <div className='w-[90px] mb-7'><picture><img className='w-full' src={!darkMode? logo : DarkLogo} alt={!darkMode? logo : DarkLogo} /></picture></div>
        <div className='bg-transparent'>
        <div className=''>
        <h1 className={`${!darkMode ? 'day-text' : 'night-text'} text-[48px] font-Inkut font-semibold text-wrap text-center`}>Welcome to AMS Project Portal!</h1>
        <h2 className={`${!darkMode ? 'day-text' : 'text-[#b4b4b4]'} mt-4 text-center text-xl font-Poppins font-semibold`}>Explore Your Projects and Manage Your Credentials</h2>
        </div>
        <div className='mt-10 flex justify-center items-center gap-x-5'>
        <Link to={'login/'}>
            <button className={`${!darkMode? 'text-black' : 'text-white'} btn w-[180px] p-0 h-[52px] border-none mx-1 my-0 outline-0 text-[18px] font-bold bg-transparent transition ease-linear duration-500 cursor-pointer overflow-hidden uppercase`}>
                <span className={`${!darkMode? 'after:border-black before:border-black' : 'border-white' } box w-full h-full flex justify-center items-center relative after:absolute after:top-0 after:left-0 after:w-full after:h-0 after:border-l-[4px] border-solid after:border-t-[4px]  after:transform after:translate-x-[100%] after:bg-transparent before:absolute before:bottom-0 before:right-0 before:bg-transparent before:border-r-[4px] before:border-b-[4px] before:w-full before:h-0 before:transform before:translate-x-[-100%]`}>
                    Sign In
                </span>
            </button>
            </Link>
            <Link to={'registration/'}>
            <button className={`${!darkMode? 'text-black' : 'text-white'} btn w-[180px] p-0 h-[52px] border-none mx-1 my-0 outline-0 text-[18px] font-bold bg-transparent transition ease-linear duration-500 cursor-pointer overflow-hidden uppercase`}>
                <span className={`${!darkMode? 'after:border-black before:border-black' : 'border-white' } box w-full h-full flex justify-center items-center relative after:absolute after:top-0 after:left-0 after:w-full after:h-0 after:border-l-[4px] border-solid after:border-t-[4px]  after:transform after:translate-x-[100%] after:bg-transparent before:absolute before:bottom-0 before:right-0 before:bg-transparent before:border-r-[4px] before:border-b-[4px] before:w-full before:h-0 before:transform before:translate-x-[-100%]`}>
                    Sign up
                </span>
            </button>
            </Link>
        </div>
        </div>
        <div className='mt-[50px] flex justify-center items-center gap-x-5'>
        <div className='relative w-[210px] h-[250px] rounded-lg bg-gray-300 main-item'>
            <div className=''>
                <span className={`${showIcons ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon facebook cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[28%] right-[12px]`}><FaFacebookF /></span>
                <span className={`${showIcons ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon twitter cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[46%] right-[12px]`}><FaTwitter /></span>
                <span className={`${showIcons ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon instagram cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[64%] right-[12px]`}><FaInstagram /></span>
            </div>
            <div className={` ${showIcons ? 'block' : 'main-button opacity-0'}  cursor-pointer w-9 h-9 rounded-full bg-white transition-all duration-300 hover:text-white text-blue-500  hover:bg-blue-500 flex justify-center items-center absolute bottom-[10px] right-[13px]`} onClick={handleSocialIcon}>
                <button className='text-base'>
                    {showIcons ? <span className='text-xl text-red-600'><RxCross2/></span> : <FaPlus />}
                </button>
            </div>
            <div className='main-address absolute bottom-[-13px] left-0 bg-blue-500 w-[70%] h-[23%] opacity-0 flex flex-col justify-center items-center rounded-tr-lg'>
                <h3 className='text-base text-white font-Poppins font-medium'>Arif Momin</h3>
                <p className='text-[12px] text-white font-Poppins font-medium'>ES MERN 2307</p>
            </div>
        </div>
        <div className='relative w-[210px] h-[250px] rounded-lg bg-gray-300 main-item'>
            <div className=''>
                <span className={`${showIconstwo ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon facebook cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[28%] right-[12px]`}><FaFacebookF /></span>
                <span className={`${showIconstwo ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon twitter cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[46%] right-[12px]`}><FaTwitter /></span>
                <span className={`${showIconstwo ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon instagram cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[64%] right-[12px]`}><FaInstagram /></span>
            </div>
            <div className={` ${showIconstwo ? 'block' : 'main-button opacity-0'}  cursor-pointer w-9 h-9 rounded-full bg-white transition-all duration-300 hover:text-white text-blue-500  hover:bg-blue-500 flex justify-center items-center absolute bottom-[10px] right-[13px]`} onClick={() => setShowIconstwo(!showIconstwo)}>
                <button className='text-base'>
                    {showIconstwo ? <span className='text-xl text-red-600'><RxCross2/></span> : <FaPlus />}
                </button>
            </div>
            <div className='main-address absolute bottom-[-13px] left-0 bg-blue-500 w-[70%] h-[23%] opacity-0 flex flex-col justify-center items-center rounded-tr-lg'>
                <h3 className='text-base text-white font-Poppins font-medium'>Arif Momin</h3>
                <p className='text-[12px] text-white font-Poppins font-medium'>ES MERN 2307</p>
            </div>
        </div>
        <div className='relative w-[210px] h-[250px] rounded-lg bg-gray-300 main-item'>
            <div className=''>
                <span className={`${showIconsThree ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon facebook cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[28%] right-[12px]`}><FaFacebookF /></span>
                <span className={`${showIconsThree ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon twitter cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[46%] right-[12px]`}><FaTwitter /></span>
                <span className={`${showIconsThree ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon instagram cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[64%] right-[12px]`}><FaInstagram /></span>
            </div>
            <div className={` ${showIconsThree ? 'block' : 'main-button opacity-0'}  cursor-pointer w-9 h-9 rounded-full bg-white transition-all duration-300 hover:text-white text-blue-500  hover:bg-blue-500 flex justify-center items-center absolute bottom-[10px] right-[13px]`} onClick={() => setShowIconsThree(!showIconsThree)}>
                <button className='text-base'>
                    {showIconsThree ? <span className='text-xl text-red-600'><RxCross2/></span> : <FaPlus />}
                </button>
            </div>
            <div className='main-address absolute bottom-[-13px] left-0 bg-blue-500 w-[70%] h-[23%] opacity-0 flex flex-col justify-center items-center rounded-tr-lg'>
                <h3 className='text-base text-white font-Poppins font-medium'>Arif Momin</h3>
                <p className='text-[12px] text-white font-Poppins font-medium'>ES MERN 2307</p>
            </div>
        </div>
        <div className='relative w-[210px] h-[250px] rounded-lg bg-gray-300 main-item'>
            <div className=''>
                <span className={`${showIconsfour ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon facebook cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[28%] right-[12px]`}><FaFacebookF /></span>
                <span className={`${showIconsfour ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon twitter cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[46%] right-[12px]`}><FaTwitter /></span>
                <span className={`${showIconsfour ? 'opacity-100 translate-x-0' : 'opacity-0 z-[-1] translate-x-[-60%]'} main-icon instagram cursor-pointer transition-all duration-300 w-9 h-9 rounded-full text-base text-black bg-white flex justify-center items-center absolute top-[64%] right-[12px]`}><FaInstagram /></span>
            </div>
            <div className={` ${showIconsfour ? 'block' : 'main-button opacity-0'}  cursor-pointer w-9 h-9 rounded-full bg-white transition-all duration-300 hover:text-white text-blue-500  hover:bg-blue-500 flex justify-center items-center absolute bottom-[10px] right-[13px]`} onClick={() => setShowIconsfour(!showIconsfour)}>
                <button className='text-base'>
                    {showIconsfour ? <span className='text-xl text-red-600'><RxCross2/></span> : <FaPlus />}
                </button>
            </div>
            <div className='main-address absolute bottom-[-13px] left-0 bg-blue-500 w-[70%] h-[23%] opacity-0 flex flex-col justify-center items-center rounded-tr-lg'>
                <h3 className='text-base text-white font-Poppins font-medium'>Arif Momin</h3>
                <p className='text-[12px] text-white font-Poppins font-medium'>ES MERN 2307</p>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Welcome