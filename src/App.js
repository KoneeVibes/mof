import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/home';
import { Auth } from './pages/auth';
import { MetricsArea } from './containers/metricsarea';
import { EntitiesArea } from './containers/entitiesarea';
import { ProjectRegistrationArea } from './containers/projectregistrationarea';
import { ProjectDetailsArea } from './containers/detailsarea';
import { EntityRegistrationArea } from './containers/entityregistrationarea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<MetricsArea />} />
        <Route path='/:entity' element={<EntitiesArea />} />
        <Route path='/registration/project' element={<ProjectRegistrationArea />} />
        <Route path='/registration/entity' element={<EntityRegistrationArea/>} />
        <Route path='/:entityId/:projectId' element={<ProjectDetailsArea />} />

        {/* Fallback route*/}
        <Route path='/*' element={<Dashboard>Invalid URL</Dashboard>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
