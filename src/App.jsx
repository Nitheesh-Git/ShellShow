import { useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import { LearningLayout } from './components/Layout';

function AppContent() {
  const { state } = useApp();

  if (state.screen === 'landing') {
    return <Dashboard />;
  }

  return <LearningLayout />;
}

export default function App() {
  return <AppContent />;
}
