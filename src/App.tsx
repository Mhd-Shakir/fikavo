import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// --- Frontend Components ---
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import PreLoader from "./components/ui/PreLoader";
import ScrollToTop from "./components/ui/ScrollToTop";
import FAQ from "./components/ui/FAQ";

// --- Admin Panel ---
import AdminApp from "./admin/AdminApp";

// --- Pages ---
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/pages/ServicesPage";
import PackagePrice from "./components/ui/PackagePrice";
import ProjectsPage from "./components/pages/ProjectsPage";
import ContactPage from "./components/pages/ContactPage";
import TechStackGuide from "./components/ui/TechStackGuide";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <PreLoader />}</AnimatePresence>

      {!isLoading && (
        <>
          <ScrollToTop />

          {/* Only show site Navbar on non-admin routes */}
          {!isAdminRoute && <Navbar />}

          <Routes>
            {/* Admin Panel (has its own layout/navbar) */}
            <Route path="/admin/*" element={<AdminApp />} />

            {/* Website Pages */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/price" element={<PackagePrice />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tech-stack-guide" element={<TechStackGuide />} />
          </Routes>

          {/* Only show site Footer and Scroll button on non-admin routes */}
          {!isAdminRoute && (
            <>
              <Footer />
              <ScrollToTopButton />
            </>
          )}
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;