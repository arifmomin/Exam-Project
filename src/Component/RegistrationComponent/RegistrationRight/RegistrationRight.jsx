import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import EyeLottieAnimation from '../../../../Utilities/Lotties/Eye.json';
import { isemailValid, isPasswordValid, isfullNameValid } from '../../../../Utilities/Validation/Validation';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { CgDanger } from 'react-icons/cg';
import { ErrorToast, SuccessToast, infoToast } from '../../../../Utilities/Toastify/Toastify';
import { RotatingLines } from 'react-loader-spinner';
import { useTheme } from '../../../Theme/ThemeContext';
import moment from 'moment';
import Logo from './RegistrationRightImage/Logo.png';
import darkmodeLogo from './RegistrationRightImage/darkmodeLogo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const RegistrationRight = () => {
  const auth = getAuth();
  const db = getDatabase();
  const Navigate = useNavigate();
  const animationContainer = useRef(null);
  const animationInstance = useRef(null);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');
  const [Checkbox, setCheckbox] = useState (false);
  const [CheckboxError, setCheckboxError] = useState (false);
  const [loading, setloading] = useState (false);
  const { darkMode } = useTheme();
  // ===========Error handaling
  const [fullNameError, setfullNameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

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
    return () => animationInstance.current.destroy();
  }, []);

  const toggleEyeAnimation = () => {
      if (isEyeOpen) {
        animationInstance.current.playSegments([0, 25], true);
      } else {
        animationInstance.current.playSegments([10, 0], true);
      }
      setIsEyeOpen(!isEyeOpen);

  };

/**
 * todo: handleSignUp function implement
 * @perams : ({})
 */
const handleSignUp = () => {
  if (!fullName) {
    setfullNameError('Please enter your Full Name.');
  }else if(!isfullNameValid(fullName)){
    setfullNameError('Full Name Must Be 5-20 charecter');
  } else if (!email) {
    setfullNameError('');
    setemailError('Please enter your Email.');
  } else if (!isemailValid(email)) {
    setemailError('Please enter a valid Email.');
  } else if (!Password) {
    setfullNameError('');
    setemailError('');
    setpasswordError('Please enter your password.');
  }else if(!isPasswordValid(Password)){
    setfullNameError('');
    setemailError('');
    setpasswordError('password must be 8 charecter');
  }else if (!Checkbox){
    setfullNameError('');
    setemailError('');
    setpasswordError('');
    setCheckboxError(!Checkbox);
  }else {
    setloading(true);
    createUserWithEmailAndPassword(auth, email, Password)
    .then((userinfo) =>{
      SuccessToast(`${fullName} Registration Successful`);
    }).then(() =>{
      updateProfile(auth.currentUser,{
        displayName : fullName,
      });
    }).then(() =>{
      sendEmailVerification(auth.currentUser).then(() =>{
        Navigate('/login')
        infoToast(`${auth.currentUser.displayName} please Check Your Email`)
      })
    }).then(() =>{
      const UserRef = ref(db, 'users/');
      set(push(UserRef) , {
        userUid : auth.currentUser.uid,
        userName: fullName,
        userEmail: auth.currentUser.email,
        userPhotoUrl : '',
        CreateAtt : moment().format(" MM DD YYYY, h:mm:ss a")
      })
      
    }).catch((err) =>{
      ErrorToast(`${err.code}`)
    }).finally(() =>{
      setfullName('');
      setemail('');
      setPassword('');
      setfullNameError('');
      setemailError('');
      setpasswordError('');
      setCheckbox(false)
      setCheckboxError(false);
      setloading(false);
    })
  }
};
const handleCheckbox = () =>{
  setCheckbox(!Checkbox)
};



  return (
    <div className={`w-[50%] h-full flex justify-center items-center`}>
      <form className="max-w-md mx-auto w-full" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div>
            <picture><img className='w-[60px] mb-7' src={!darkMode? Logo : darkmodeLogo} alt={Logo} /></picture>
          </div>
          <h2 className={`${!darkMode ? 'day-text' : 'night-text'} text-[22px] font-semibold font-Poppins`}>Sign up</h2>
          <p className={`${!darkMode ? 'day-text' : 'night-text'} text-sm font-normal font-Poppins mt-1 mb-3`}>
            Already have an account? <span className='font-semibold text-[#38CB89] cursor-pointer'><Link to={'/login'}>Sign in</Link></span>
          </p>
        </div>
        <div>
    </div>
        <div className="relative z-0 w-full mb-5 group">
            <input
            type="name"
            name="name"
            className = {`${!fullNameError ? 'border-gray-300' : 'dark:border-red-600 mb-7'} ${!darkMode ? 'day-text' : 'night-text'} block py-2.5 px-0 w-full text-base  text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />{!fullNameError ? '' : (
            <span className='text-[22px] text-red-500 absolute top-[28%] right-0 cursor-pointer'><CgDanger /></span>
        )}
          <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
          <span className='absolute bottom-[-22px] left-0 block text-red-500 font-medium font-Poppins text-sm'>{fullNameError}</span>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name='email'
            className={`${!emailError ? 'border-gray-300' : 'dark:border-red-600 mb-7'} ${!darkMode ? 'text-gray-900' : 'night-text'} block py-2.5 px-0 w-full text-base !bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />{!emailError ? '' : (
            <span className='text-[22px] text-red-500 absolute top-[28%] right-0 cursor-pointer'><CgDanger /></span>
        )}
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        <span className='absolute bottom-[-22px] left-0 block text-red-500 font-medium font-Poppins text-base'>{emailError}</span>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type={isEyeOpen ? 'text' : 'password'}
            className={`${!passwordError ? 'border-gray-300' : 'dark:border-red-600 mb-7'} ${!darkMode ? 'text-gray-900' : 'night-text'} block py-2.5 px-0 w-full text-base  !bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          <span className='absolute bottom-[-22px] left-0 block text-red-500 font-medium font-Poppins text-base'>{passwordError}</span>
          <div
            className={`${!darkMode ? 'daypath' : 'nightpath'} cursor-pointer w-[25px] absolute top-[26%] right-0`}
            ref={animationContainer}
            onClick={toggleEyeAnimation}
          ></div>
        </div>
        <div className='flex justify-start items-center gap-x-3 my-8'>
           <input
    type="checkbox"
    id="cbx"
    className="hidden"
    checked={Checkbox}
    onChange={handleCheckbox}
  />
  <label htmlFor="cbx" className="check cursor-pointer">
    <svg className={`${!CheckboxError ? '' : 'stroke-[red]'} ${!darkMode ? 'stroke-[#c8ccd4]' : 'stroke-[#7a7a7a]'} w-[18px] h-[18px] viewBox="0 0 18 18`}>
      <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
      {Checkbox && <polyline points="1 9 7 14 15 4"></polyline>}
    </svg>
  </label>
          <h3 className={`${!darkMode ? 'day-text' : 'text-[#b9b9b9]'} text-base font-normal font-Poppins text-[#6C7275]`}>
            I agree with <span className={`${!darkMode ? 'text-[#141718]' : 'text-[#e4e4e4]'} font-semibold cursor-pointer`}>Privacy Policy</span> and <span className={`${!darkMode ? 'text-[#141718]' : 'text-[#e4e4e4]'} font-semibold cursor-pointer`}>Terms of Use</span>
          </h3>
        </div>
        <button className={`${!darkMode? 'bg-black'  : 'Day-Background'} signUp overflow-hidden w-full h-[50px]  flex justify-center items-center text-base text-[#38CB89] font-semibold font-Poppins rounded-md ease-linear duration-200 hover:text-white`} onClick={handleSignUp}>{
          loading ? (
            <RotatingLines
             visible={true}
             height="35"
             width="35"
             color="grey"
             strokeWidth="5"
             animationDuration="0.75"
             ariaLabel="rotating-lines-loading"
             wrapperStyle={{}}
             wrapperClass=""
             />
          ) : (
            'Sign Up'
          )
          }</button>
      </form>
    </div>
  );
};

export default RegistrationRight;
