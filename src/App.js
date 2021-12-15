//Dependencies
import './App.css';
import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'


//Components
import Signup from './pages/Signup';
import HeaderBar from './components/HeaderBar/HeaderBar';
import Login from './pages/Login';
import OtpValid from './pages/OtpValid';
import AddUser from './pages/addUser';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  // const [headerText, setHeaderText] = useState('')
  const loc = useLocation()

  return (
    <div className="App">
      {
        loc.pathname === '/' ? (
          <HeaderBar alternateWay={'Login'} alternateLink={'/login'} />
        )
          : loc.pathname === '/login' ? (
            <HeaderBar alternateWay={'Sign up'} alternateLink={'/'} />
          )
            : (
              <HeaderBar />
            )
      }
      <Routes>
        <Route path='/' element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/login' element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/otp' element={<OtpValid userLoggedIn={userLoggedIn} />} />
        <Route path='/adduser' element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
