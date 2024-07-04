import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Auth } from './pages/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
