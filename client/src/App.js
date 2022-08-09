import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './Pages/Editor';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';
import Auth from './Pages/Auth';
import NavBar from './Pages/NavBar';
import Profile from './Pages/Profile'
import ContextMenu from './Pages/ContextMenu';
import { ReusableUIProvider } from './ReusableUIContext';
import Alert from './Pages/Alert';

function App() {

  return (
    <BrowserRouter>
      <ReusableUIProvider>
        <Alert />
        <NavBar />
        <ContextMenu />
        <Routes>
          <Route path='/editor/:songId' element={<Editor />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/user/:username' element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </ReusableUIProvider>
    </BrowserRouter>
  )
}

export default App;
