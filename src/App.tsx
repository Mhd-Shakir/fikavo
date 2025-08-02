import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
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

// --- Pages ---
import ContactPage from './components/pages/ContactPage';
import ServicesPage from './components/pages/ServicesPage';
import ProcessPage from './components/pages/ProcessPage';
import ProjectsPage from './components/pages/ProjectsPage';

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
        <>
          {/* <nav className="p-4 bg-gray-100 flex gap-4">
            <Link to="/">Pages</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/services">Services</Link>
            <Link to="/process">Process</Link>
            <Link to="/projects">Projects</Link>
          </nav> */}

          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminApp />} />

            {/* Main Website */}
            <Route
              path="/"
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

            {/* Page Routes */}
            {/* <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/projects" element={<ProjectsPage />} /> */}

            {/* Catch-all for 404 */}
            <Route path="*" element={<div className="p-8 text-center text-red-600 font-bold">404 - Page Not Found</div>} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
