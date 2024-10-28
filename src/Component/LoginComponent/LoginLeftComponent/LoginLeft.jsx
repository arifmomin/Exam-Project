import React, {useRef, useState, useEffect} from 'react'
import { useTheme } from '../../../Theme/ThemeContext'
import lottie from 'lottie-web';
import EyeLottieAnimation from '../../../../Utilities/Lotties/Eye.json';
import Logo from './LoginLeftImage/Logo.png';
import darkmodeLogo from './LoginLeftImage/darkmodeLogo.png'
import Checkbox from '../../../../Utilities/Lotties/Checkbox.json'
import { isemailValid, isPasswordValid } from '../../../../Utilities/Validation/Validation';
import { CgDanger } from 'react-icons/cg';
import { RotatingLines } from 'react-loader-spinner';
import { ErrorToast, SuccessToast } from '../../../../Utilities/Toastify/Toastify';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider  } from "firebase/auth";
import { push,getDatabase, ref, set } from 'firebase/database';
import moment from 'moment';
const LoginLeft = () => {
const auth = getAuth()
const db = getDatabase();
const {darkMode} = useTheme();
const animationContainer = useRef(null);
const animationInstance = useRef(null);
const checkboxanimationContainer = useRef(null);
const checkboxanimation = useRef(null);
const [isEyeOpen, setIsEyeOpen] = useState(false);
const [checkbox, setcheckbox] = useState(true);
const [loading, setloading] = useState(false);
const [logininput, setlogininput] = useState ({
        email: "",
        password : "",
    });
const [loginError, setloginError] = useState ({
  emailError : '',
  passwordError : '',
})    


const handleinput = (event) =>{
    const {id, value} = event.target;
    setlogininput({
        ...logininput,
        [id] : value,
    });
};

const handleSignin = (() =>{
  const {email , password} = logininput;
  if(!email || !isemailValid){
    setloginError({
      ...loginError,
      emailError: 'Please enter a valid Email.',
    });
  }else if(!password || !isPasswordValid){
    setloginError({
      ...loginError,
      emailError: '',
      passwordError: 'Please enter your correct password',
    });
  }else if(checkbox){
    alert('checkbox click');
  } else{
    setloading(true);
    setloginError({
      ...loginError,
      emailError: '',
      passwordError: '',
    });
    signInWithEmailAndPassword(auth, email, password)
  .then(() => {
   SuccessToast('Log In Sucessful');
  })
  .catch((error) => {
    const errorCode = error.code;
    ErrorToast(errorCode);

  }).finally(() =>{
    setloading(false);
    setlogininput({ ...logininput, email: "", password : "" });
  setloginError({ ...loginError, emailError: '', passwordError: ''});
  setcheckbox(false)
  console.log('log in done', checkbox);
  })
  }
});
// ================ google log in 
const handleGoogleLogin = (() =>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
      return user;

  }).then((user) =>{
    const {displayName , email, localId, photoUrl} = user.reloadUserInfo;    
    const UserRef = ref(db, 'users/');
    set(push(UserRef) , {
      userUid : localId,
      userName: displayName,
      userEmail: email,
      userPhotoUrl : photoUrl ? photoUrl : null,
      CreateAtt : moment().format(" MM DD YYYY, h:mm:ss a")
    })
  }).then(() =>{
    SuccessToast('Log In Successful')
  })
  .catch((error) => {
    const errorCode = error.code;
    ErrorToast(errorCode)
    console.log('eoor khaiso');
    
  });
})
const handleFacebookLogin = (() =>{
  // const provider = new FacebookAuthProvider();
  // signInWithPopup(auth, provider)
  // .then((result) => {
  //   const user = result.user;
  //   const credential = FacebookAuthProvider.credentialFromResult(result);
  //   const accessToken = credential.accessToken;

  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   ErrorToast(errorCode);
  // });
  alert('asdf')
})

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
        checkboxanimation.current.playSegments([10, 0], false);
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
          Not a member ?   <span className='font-semibold text-[#38CB89] cursor-pointer'><Link to={'/registration'}>Sign Up</Link></span>
          </p>
        </div>
        <div>
    </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name='email'
            id='email'
            className={`${!loginError.emailError ? 'border-gray-300' : 'dark:border-red-600 mb-7'} ${!darkMode ? 'day-text' : 'night-text'} block py-2.5 px-0 w-full text-base  text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            value={logininput.email}
           onChange={handleinput}
          />
          {!loginError.emailError ? '' : (
            <span className='text-[22px] text-red-500 absolute top-[28%] right-0 cursor-pointer'><CgDanger /></span>
        )}
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          <span className='absolute bottom-[-22px] left-0 block text-red-500 font-medium font-Poppins text-sm'>{loginError.emailError}</span>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type={isEyeOpen ? 'text' : 'password'}
            id='password'
            className={`${!loginError.passwordError ? 'border-gray-300' : 'dark:border-red-600'} ${!darkMode ? 'text-gray-900' : 'night-text'} block py-2.5 px-0 w-full text-base  !bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            value={logininput.password}
            onChange={handleinput}
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          <span className='absolute bottom-[-22px] left-0 block text-red-500 font-medium font-Poppins text-sm'>{loginError.passwordError}</span>
          <div
            className={`${!darkMode ? 'daypath' : 'nightpath'} cursor-pointer w-[25px] absolute top-[26%] right-0`}
            ref={animationContainer}
            onClick={toggleEyeAnimation}
          ></div>
        </div>
        <div className='flex justify-between items-center mb-8 mt-5'>
            <div className='flex justify-start items-center gap-x-1'>
            <div onClick={toggleCheckboxAnimation} ref={checkboxanimationContainer} className={`${!darkMode ? 'daypath' : 'nightpath'} cursor-pointer w-7 h-7`}></div>
            <h3 className={`${!darkMode ? '' : 'text-[#b9b9b9]'} ${ checkbox ? 'text-[#6C7275]' : 'text-blue-500'} text-base font-normal font-Poppins`}>
            Remember me
            </h3>
            </div>
            <div><p className={`${ !darkMode ? 'text-[#4F46E6]' : 'text-[#3B82F6]'} text-base  font-Poppins font-medium cursor-pointer`}>Forgate Password</p></div>
        </div>
        <button className={`${!darkMode? 'bg-blue-600' : 'bg-blue-500 after:bg-white before:bg-white !text-black'} signUp overflow-hidden w-full h-[50px] flex justify-center items-center text-base text-white font-semibold font-Poppins rounded-md ease-linear duration-200 hover:text-white`}onClick={handleSignin} >{
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
            'Sign in'
          )
          }</button>
          <div>
          <div className='mt-9 mb-4 w-full text-center '>
            <h2 className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Poppins font-medium relative after:absolute after:top-1/2 after:left-[0%] after:w-[28%] after:h-[1px] after:bg-gray-400 before:absolute before:top-1/2 before:right-0 before:w-[28%] before:h-[1px] before:bg-gray-400`}>Or continue with</h2>
          </div>
          <div className='w-full flex justify-between items-center'>
            <button className='flex justify-center items-center gap-x-[10px] w-[47%] h-[45px] bg-transparent border-[1px] border-gray-400 rounded-md' onClick={handleGoogleLogin}>
              <span className='block text-[22px]'><FcGoogle/></span>
              <span className={`${!darkMode? 'text-gray-600' : 'text-[#b9b9b9]'} text-base font-Poppins font-medium`}>Google</span>
              </button>
              <button className='flex justify-center items-center gap-x-[10px] w-[47%] h-[45px] bg-transparent border-[1px] border-gray-400 rounded-md' onClick={handleFacebookLogin}>
              <span className='block text-[22px] text-[#1877F2]'><FaFacebook/></span>
              <span className={`${!darkMode? 'text-gray-600' : 'text-[#b9b9b9]'} text-base font-Poppins font-medium`}>Facebook</span>
              </button>
          </div>
          </div>
      </form>
    </div>
  )
}

export default LoginLeft