import './App.css';
import 'rsuite/dist/rsuite.min.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Editor from './Pages/Editor';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/editor">Editor </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path='/editor/:songId' element={<Editor />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
