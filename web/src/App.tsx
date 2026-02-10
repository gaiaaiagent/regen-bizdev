import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Explorer } from './pages/Explorer';
import { GraphExplorer } from './pages/GraphExplorer';
import { RenewDashboard } from './pages/renew/RenewDashboard';
import { LandbankingDashboard } from './pages/landbanking/LandbankingDashboard';

function App() {
  return (
    <Routes>
      {/* Full-page graph — outside Layout */}
      <Route path="graph" element={<GraphExplorer />} />
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="explore" element={<Explorer />} />
        <Route path="renew" element={<RenewDashboard />} />
        <Route path="landbanking" element={<LandbankingDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
