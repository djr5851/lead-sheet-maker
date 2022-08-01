import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './Pages/Editor';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';
import Auth from './Pages/Auth';
import NavBar from './Pages/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/editor/:songId' element={<Editor />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
