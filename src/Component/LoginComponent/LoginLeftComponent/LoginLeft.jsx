import React, {useRef, useState, useEffect} from 'react'
import { useTheme } from '../../../Theme/ThemeContext'
import lottie from 'lottie-web';
import EyeLottieAnimation from '../../../../Utilities/Lotties/Eye.json';
import Logo from './LoginLeftImage/Logo.png';
import darkmodeLogo from './LoginLeftImage/darkmodeLogo.png'
import Checkbox from '../../../../Utilities/Lotties/Checkbox.json'

const LoginLeft = () => {
const {darkMode} = useTheme();
const animationContainer = useRef(null);
const animationInstance = useRef(null);
const checkboxanimationContainer = useRef(null);
const checkboxanimation = useRef(null);
const [isEyeOpen, setIsEyeOpen] = useState(false);
const [checkbox, setcheckbox] = useState(true);
const [logininput, setlogininput] = useState (
    {
        email: "",
        password : "",
    }
);

const handleinput = (event) =>{
    const {id, value} = event.target;
    setlogininput({
        ...logininput,
        [id] : value,
    });

    
};

console.log(logininput);

/**
 * todo: Lotties animation
 */
useEffect(() => {
    animationInstance.current = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: EyeLottieAnimation,
    });
    checkboxanimation.current = lottie.loadAnimation({
        container: checkboxanimationContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: Checkbox,
      });
    return (() =>{
        animationInstance.current.destroy();
        checkboxanimation.current.destroy();
    }) 
  }, []);

  const toggleEyeAnimation = () => {
      if (isEyeOpen) {
        animationInstance.current.playSegments([0, 25], true);
      } else {
        animationInstance.current.playSegments([10, 0], true);
      }
      setIsEyeOpen(!isEyeOpen); 
  };
  const toggleCheckboxAnimation = () => {
    if (checkbox) {
        checkboxanimation.current.playSegments([0, 25], true);
    } else {
        checkboxanimation.current.playSegments([10, 0], true);
    }
    setcheckbox(!checkbox); 
};
  return (
    <div className='w-[55%]'>
        <form className="max-w-md mx-auto w-full" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div>
            <picture><img className='w-[60px] mb-7' src={!darkMode? Logo : darkmodeLogo} alt={Logo} /></picture>
          </div>
          <h2 className={`${!darkMode ? 'day-text' : 'night-text'} text-[22px] font-semibold font-Poppins`}>Sign in to your account</h2>
          <p className={`${!darkMode ? 'day-text' : 'night-text'} text-sm font-normal font-Poppins mt-2 mb-5`}>
          Not a member ?   <span className='font-semibold text-[#38CB89] cursor-pointer'> Sign Up</span>
          </p>
        </div>
        <div>
    </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name='email'
            id='email'
            className={`${!darkMode ? 'text-gray-900' : 'night-text'} block py-2.5 px-0 w-full text-base !bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer` }
            placeholder=" "
           onChange={handleinput}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type={isEyeOpen ? 'text' : 'password'}
            id='password'
            className={` ${!darkMode ? 'text-gray-900' : 'night-text'} block py-2.5 px-0 w-full text-base  !bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            // value={Password}
            onChange={handleinput}
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          <div
            className={`${!darkMode ? 'daypath' : 'nightpath'} cursor-pointer w-[25px] absolute top-[26%] right-0`}
            ref={animationContainer}
            onClick={toggleEyeAnimation}
          ></div>
        </div>
        <div className='flex justify-between items-center my-8'>
            <div className='flex justify-start items-center gap-x-1'>
            <div onClick={toggleCheckboxAnimation} ref={checkboxanimationContainer} className={`${!darkMode ? 'daypath' : 'nightpath'} cursor-pointer w-7 h-7`}></div>
            <h3 className={`${!darkMode ? '' : 'text-[#b9b9b9]'} ${ checkbox ? 'text-[#6C7275]' : 'text-blue-500'} text-base font-normal font-Poppins`}>
            Remember me
            </h3>
            </div>
            <div><p className={`${ !darkMode ? 'text-[#4F46E6]' : 'text-[#3B82F6]'} text-base  font-Poppins font-medium cursor-pointer`}>Forgate Password</p></div>
        </div>
        <button className={`${!darkMode? 'bg-black'  : 'Day-Background'} signUp overflow-hidden w-full h-[50px]  flex justify-center items-center text-base text-[#38CB89] font-semibold font-Poppins rounded-md ease-linear duration-200 hover:text-white`}>{
        //   loading ? (
        //     <RotatingLines
        //      visible={true}
        //      height="35"
        //      width="35"
        //      color="grey"
        //      strokeWidth="5"
        //      animationDuration="0.75"
        //      ariaLabel="rotating-lines-loading"
        //      wrapperStyle={{}}
        //      wrapperClass=""
        //      />
        //   ) : (
        //     'Sign Up'
        //   )
        'Sign in'
          }</button>
      </form>
    </div>
  )
}

export default LoginLeft