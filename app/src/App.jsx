import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeroPage from './components/heroPage/HeroPage'
import SignIn from './components/signInPage/SignIn'
import SignUp from './components/signUpPage/SignUp'
import MainBody from './components/mainBody/MainBody'
import RegisterSuccessful from  './components/signUpPage/RegisterSuccessful'
import { ToastContainer } from 'react-toastify'


function App() {



  return (


      <BrowserRouter> 

    <Routes>

    <Route exact path='/' element={<HeroPage/>} ></Route>
    <Route exact path='/signIn' element={<SignIn/>} ></Route>
    <Route exact path='/signUp' element={<SignUp/>} ></Route>
    <Route exact path='/home' element={<MainBody/>} ></Route>
    <Route exact path='/registerSuccessful' element={<RegisterSuccessful/> } ></Route>

    </Routes>

    </BrowserRouter> 

  )
}

export default App
