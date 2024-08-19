import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { ProjectsTableArea } from './containers/projectstablearea';
import { ProjectRegistrationArea } from './containers/projectregistrationarea';
import { ProjectDetailsArea } from './containers/detailsarea';
import { SubAdminOnboardingArea } from './containers/subadminonboardingarea';
import { DisbursementRequestArea } from './containers/disbursementpostingarea';
import { UserRegistrationArea } from './containers/userregistrationarea';
import { UserOnboardingArea } from './containers/useronboardingarea';
import { EntityOnboardingArea } from './containers/entityonboardingarea';
import { ArchivesArea } from './containers/archivesarea';
import { FundingSourceOnboardingArea } from './containers/fundingsourceonboardingarea';
import { CurrencyOnboardingArea } from './containers/currencyonboardingarea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/:entity/:entityId/projects' element={<ProjectsTableArea />} />
        <Route path='/:entity/:projectId' element={<ProjectDetailsArea />} />
        <Route path='/:entity/:projectId/request' element={<DisbursementRequestArea />} />
        <Route path='/registration/project' element={<ProjectRegistrationArea />} />
        {/* Route to the archives area */}
        <Route path='/admin/:userId/archives' element={<ArchivesArea />} />
        {/* Route to add a funding source */}
        <Route path='/registration/:subAdminId/funding' element={<FundingSourceOnboardingArea />} />
        {/* Route to add a currency*/}
        <Route path='/registration/:subAdminId/currency' element={<CurrencyOnboardingArea />} />
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
