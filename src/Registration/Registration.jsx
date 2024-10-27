import React from 'react'
import RegistrationLeft from '../Component/RegistrationComponent/RegistrationLeft/RegistrationLeft'
import RegistrationRight from '../Component/RegistrationComponent/RegistrationRight/RegistrationRight'
import { useTheme } from '../Theme/ThemeContext';
const Registration = () => {
  const {darkMode} = useTheme()
  return (
    <div className= {`${!darkMode ? 'Day-Background' : 'Night-Background'} flex flex-wrap w-full h-screen justify-center items-center`}>
      <RegistrationLeft/>
      <RegistrationRight/>
    </div>
  )
}

export default Registration