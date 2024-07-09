import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/home';
import { Auth } from './pages/auth';
import { MetricsArea } from './containers/metricsarea';
import { EntitiesArea } from './containers/entitiesarea';
import { ProjectRegistrationArea } from './containers/projectregistrationarea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Dashboard />} /> {/* This should be the fallback route*/}
        <Route path='/dashboard' element={<MetricsArea />} />
        <Route path='/entities' element={<EntitiesArea />} />
        <Route path='/registration/project' element={<ProjectRegistrationArea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
