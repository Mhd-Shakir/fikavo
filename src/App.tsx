import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Frontend Components ---
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import PreLoader from "./components/ui/PreLoader";
import ScrollToTop from "./components/ui/ScrollToTop";


// --- Admin Panel ---
import AdminApp from "./admin/AdminApp";

// --- Pages ---
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/pages/ServicesPage";
import ProcessPage from "./components/pages/ProcessPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import ContactPage from "./components/pages/ContactPage";

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
      <AnimatePresence>{isLoading && <PreLoader />}</AnimatePresence>

      {!isLoading && (
        <>
          {/* Common Components */}
          <ScrollToTop />
          <Navbar />

          <Routes>
            {/* Admin Panel */}
            <Route path="/admin/*" element={<AdminApp />} />

            {/* Website Pages */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>

          {/* Common Components */}
          <Footer />
          <ScrollToTopButton />
        </>
      )}
    </Router>
  );
}

export default App;
