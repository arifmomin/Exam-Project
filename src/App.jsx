import React from 'react'
import Registration from './Registration/Registration'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DarkmodeToggle from './Theme/DarkmodeToggle.jsx';
import { ThemeProvider } from './Theme/ThemeContext.jsx';
import Login from '../src/Login/Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const App = () => {

const router = createBrowserRouter ([
  {
    path: 'registration/',
    element: <Registration/>,
  },{
    path: 'login/',
    element: <Login/>
  }
])

  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
        <DarkmodeToggle/>
      <ToastContainer/>
    </ThemeProvider>

  )
}

export default App;

