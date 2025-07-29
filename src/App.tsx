import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// --- Frontend Components ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import PreLoader from './components/ui/PreLoader';

// --- Admin Panel ---
import AdminApp from './admin/AdminApp';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {isLoading && <PreLoader />}
      </AnimatePresence>

      {!isLoading && (
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* Main Website */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <Hero />
                <Services />
                <Process />
                <Portfolio />
                <Contact />
                <Footer />
                <ScrollToTopButton />
              </div>
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
