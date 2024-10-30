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
import { Home } from './Home/Home.jsx';
import Welcome from './WeclomePage/Welcome.jsx'
const App = () => {

const router = createBrowserRouter ([{
  path: '/',
  element : <Welcome/>
},
  {
    path: 'registration/',
    element: <Registration/>,
  },{
    path: 'login/',
    element: <Login/>
  }, {
    path : '/home',
    element : <Home/>
  }
]);

  return (
    <ThemeProvider>
      <RouterProvider router={router}/>
        <DarkmodeToggle/>
      <ToastContainer/>
    </ThemeProvider>

  )
}

export default App;

