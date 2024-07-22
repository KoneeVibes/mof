import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/home';
import { Auth } from './pages/auth';
import { MetricsArea } from './containers/metricsarea';
import { ProjectsTableArea } from './containers/projectstablearea';
import { ProjectRegistrationArea } from './containers/projectregistrationarea';
import { ProjectDetailsArea } from './containers/detailsarea';
import { SubAdminOnboardingArea } from './containers/subadminonboardingarea';
import { DisbursementRequestArea } from './containers/disbursementrequestarea';
import { UserRegistrationArea } from './containers/userregistrationarea';
import { UserOnboardingArea } from './containers/useronboardingarea';
import { EntityOnboardingArea } from './containers/entityonboardingarea';

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
        {/* Route to add a user to a project */}
        <Route path='/registration/:projectId/add/user' element={<UserRegistrationArea />} />
        {/* Route to onboard a new user - Pending */}
        <Route path='/registration/:subAdminId/onboard/user' element={<UserOnboardingArea />} />
        {/* Route to onboard a subadmin */}
        <Route path='/registration/:superAdminId/subadmin' element={<SubAdminOnboardingArea />} />
        {/* Route to onboard an organization */}
        <Route path='/registration/:superAdminId/entity' element={<EntityOnboardingArea />} />

        {/* Fallback route*/}
        <Route path='/*' element={<Dashboard>Invalid URL</Dashboard>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
