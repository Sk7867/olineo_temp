//Dependencies
import './App.css';
import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'


//Components
import Signup from './pages/Signup';
import HeaderBar from './components/HeaderBar/HeaderBar';
import Login from './pages/Login';
import OtpValid from './pages/OtpValid';

function App() {
  // const [headerText, setHeaderText] = useState('')
  const loc = useLocation()

  // console.log(loc);
  return (
    <div className="App">
      {
        loc.pathname === '/signup' ? (
          <HeaderBar alternateWay={'Login'} alternateLink={'/login'} />
        )
          : loc.pathname === '/login' ? (
            <HeaderBar alternateWay={'Sign up'} alternateLink={'/signup'} />
          )
            : (
              <HeaderBar />
            )
      }
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OtpValid />} />
      </Routes>
    </div>
  );
}

export default App;
