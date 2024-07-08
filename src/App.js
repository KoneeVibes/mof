import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
// import { Dashboard } from './containers/dashboard';
import { MetricsArea } from './containers/metricsarea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<MetricsArea />}
        />
        <Route path='/home' element={<Home />} />
        {/* <Route path='/ministries' element={<MinistriesArea />} /> */}
        <Route path='/' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
