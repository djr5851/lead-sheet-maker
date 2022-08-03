import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './Pages/Editor';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';
import Auth from './Pages/Auth';
import NavBar from './Pages/NavBar';
import Profile from './Pages/Profile'

function App() {
  const signedInUser = JSON.parse(localStorage.getItem('profile'))?.result;
  return (
    <BrowserRouter>
      <NavBar signedInUser={ signedInUser } />
      <Routes>
        <Route path='/editor/:songId' element={<Editor signedInUser={ signedInUser } />} />
        <Route path='/dashboard' element={<Dashboard signedInUser={ signedInUser } />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/user/:username' element={<Profile signedInUser={ signedInUser }/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
