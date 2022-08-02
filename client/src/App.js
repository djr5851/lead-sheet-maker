import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './Pages/Editor';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';
import Auth from './Pages/Auth';
import NavBar from './Pages/NavBar';
import Profile from './Pages/Profile'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <NavBar user={ user } />
      <Routes>
        <Route path='/editor/:songId' element={<Editor user={ user } />} />
        <Route path='/dashboard' element={<Dashboard user={ user } />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/user/:username' element={<Profile signedInUser={ user }/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
