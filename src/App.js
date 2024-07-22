import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/home';
import { Auth } from './pages/auth';
import { MetricsArea } from './containers/metricsarea';
import { ProjectsTableArea } from './containers/projectstablearea';
import { ProjectRegistrationArea } from './containers/projectregistrationarea';
import { ProjectDetailsArea } from './containers/detailsarea';
import { EntityRegistrationArea } from './containers/entityregistrationarea';
import { UserRegistrationArea } from './containers/userregistrationarea';
import { DisbursementRequestArea } from './containers/disbursementrequestarea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<MetricsArea />} />
        <Route path='/:entity/:entityId/projects' element={<ProjectsTableArea />} />
        <Route path='/:entity/:projectId' element={<ProjectDetailsArea />} />
        <Route path='/:entity/:projectId/request' element={<DisbursementRequestArea />} />
        <Route path='/registration/project' element={<ProjectRegistrationArea />} />
        <Route path='/registration/:projectId/user' element={<UserRegistrationArea />} />
        <Route path='/registration/entity' element={<EntityRegistrationArea />} />

        {/* Fallback route*/}
        <Route path='/*' element={<Dashboard>Invalid URL</Dashboard>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
