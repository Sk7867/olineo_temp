//Dependencies
import './App.css';
// import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'


//Components
import Signup from './pages/Signup';
import HeaderBar from './components/HeaderBar/HeaderBar';
import Login from './pages/Login';
import OtpValid from './pages/OtpValid';
import AddUser from './pages/addUser';

function App() {
  // const [headerText, setHeaderText] = useState('')
  const loc = useLocation()

  // console.log(loc);
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
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OtpValid />} />
        <Route path='/adduser' element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
