import React from 'react'
import { useTheme } from '../../../Theme/ThemeContext'
const RegistrationLeft = () => {
  const {darkMode} = useTheme();
  return (
    <div className= {`${!darkMode ? '' : 'registration-Night'} registrationLeft w-[50%] h-full bg-transparent {bg[#F3F5F7]} flex justify-center items-center relative`}>
    </div>
  )
}

export default RegistrationLeft