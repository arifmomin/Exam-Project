import React from 'react'
import LoginLeft from '../Component/LoginComponent/LoginLeftComponent/LoginLeft';
import LoginRight from '../Component/LoginComponent/LoginRightComponent/LoginRight';
import { useTheme } from '../Theme/ThemeContext';
const Login = () => {
const {darkMode} = useTheme()




  return (
    <div className={`${!darkMode ? 'Day-Background' : 'Night-Background'} flex flex-wrap w-full h-screen justify-center items-center`}>
      <LoginLeft/>
      <LoginRight/>
    </div>
  )
}

export default Login