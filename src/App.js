//Dependencies
import './App.css';
import { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom'


//Components
import Signup from './pages/Signup';
import Login from './pages/Login';
import OtpValid from './pages/OtpValid';
import AddUser from './pages/addUser';
import HeaderBar2 from './components/HeaderBar2/HeaderBar2';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const [sidebar, setSidebar] = useState(false)
  // const [headerText, setHeaderText] = useState('')
  const loc = useLocation()

  return (
    <div className="App">
      {
        loc.pathname === '/' ? (
          <HeaderBar2 setSidebar={setSidebar} />
        ) : ('')
      }
      <Routes>
        <Route path='/signup' element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/login' element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/otp' element={<OtpValid userLoggedIn={userLoggedIn} />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/' element={<Home sidebar={sidebar} setSidebar={setSidebar} />} />
      </Routes>
      {
        loc.pathname === '/' ? (
          <Footer />
        ) : ('')
      }
    </div>
  );
}

export default App;
