import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './Pages/Editor';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';
import Auth from './Pages/Auth';
import NavBar from './Pages/NavBar';
import Profile from './Pages/Profile'
import { useEffect, useState } from 'react';
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { logout } from './features/users/userSlice';
import ContextMenu from './Pages/ContextMenu';

function App() {
  const signedInUser = JSON.parse(localStorage.getItem('profile'))?.result; 
  const dispatch = useDispatch(); 

  useEffect(() => {
    // log out if jwt token is expired
    const token = signedInUser?.token;

    if (token) {
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
    }
  })

  const [contextMenu, setContextMenu] = useState({ 
    visible: false,
    position: { x: 0, y: 0},
    content: {}
  });

  const hide = () => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }

  return (
    <BrowserRouter>
      <NavBar setContextMenu={ setContextMenu }/>
      <ContextMenu data={ contextMenu } hide={ hide } />
      <Routes>
        <Route path='/editor/:songId' element={<Editor />} />
        <Route path='/dashboard' element={<Dashboard setContextMenu={ setContextMenu }/>} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/user/:username' element={<Profile setContextMenu={ setContextMenu }/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
