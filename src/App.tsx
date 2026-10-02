import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WithdrawalsTicker from './components/WithdrawalsTicker';
import Features from './components/Features';
import Footer from './components/Footer';
import AuthModal, { type AuthMode } from './components/AuthModal';

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const openAuth = useCallback((mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar onAuthClick={() => openAuth('login')} />
      <main>
        <Hero onStart={() => openAuth('signup')} />
        <WithdrawalsTicker />
        <Features />
      </main>
      <Footer />
      <AuthModal open={authOpen} initialMode={authMode} onClose={closeAuth} />
    </div>
  );
}
