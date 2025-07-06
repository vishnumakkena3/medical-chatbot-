import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SymptomChecker from './components/SymptomChecker';
import Recommendations from './components/Recommendations';
import Appointments from './components/Appointments';
import Prescriptions from './components/Prescriptions';
import Doctors from './components/Doctors';
import Hospitals from './components/Hospitals';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="symptom-checker" element={<SymptomChecker />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="hospitals" element={<Hospitals />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
