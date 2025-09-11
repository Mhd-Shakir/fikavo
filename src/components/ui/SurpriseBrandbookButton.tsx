import React, { useState } from 'react';
import { FileText, Download, Sparkles, X, Eye, ZoomIn, ZoomOut } from 'lucide-react';

const CircularBrandbookButton = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  // Replace with your actual PDF URL
  const pdfUrl = '../assets/Fikavo-Brand-Guidelines.pdf';

  const handleViewPDF = () => {
    setShowPDF(true);
  };

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Fikavo-Brand-Guidelines.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(pdfUrl, '_blank');
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <>
      <div className="flex justify-center py-12 bg-gradient-to-b from-transparent to-slate-50/30">
        <div className="relative">
          {/* Main Button */}
          <button
            onClick={handleViewPDF}
            className="group relative w-24 h-24 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-full shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:shadow-3xl"
            style={{
              animation: 'float 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite',
            }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s ease-in-out infinite',
              }}
            />

            {/* Icon container */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
              <div className="transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125 mb-1">
                <FileText className="w-7 h-7" />
              </div>
              <div className="animate-pulse">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>

            {/* Floating particles around button */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                style={{
                  left: `${50 + 35 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                  top: `${50 + 35 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                  animation: `particle-float-${i} 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </button>

          {/* Ripple rings */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-300/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-[-8px] rounded-full border border-blue-300/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          
          {/* Label */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200/50">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-600" />
                View Brandbook
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPDF && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] flex flex-col overflow-hidden relative transform transition-all duration-500"
            style={{ animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 p-4 text-white relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, white 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 5s ease-in-out infinite',
                }}
              />
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Fikavo Brandbook</h2>
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-3">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                    <button
                      onClick={handleZoomOut}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      disabled={zoom >= 2}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setShowPDF(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 bg-gray-100 relative overflow-auto">
              <div className="flex justify-center p-6" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                {/* PDF Embed */}
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full max-w-4xl border-0 bg-white shadow-lg rounded-lg"
                  style={{ height: '800px' }}
                  title="Fikavo Brandbook PDF"
                  onError={() => console.log('PDF failed to load')}
                >
                </iframe>
                
                {/* Fallback if PDF doesn't load */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-white rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-lg mb-4">Loading PDF...</p>
                  <p className="text-sm text-gray-400">If PDF doesn't load, click Download below</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>Click and drag to navigate • Use zoom controls to resize</p>
                <p className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Fikavo Brand Guidelines
                </p>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes scaleIn {
              from { 
                opacity: 0;
                transform: scale(0.3) rotate(-10deg) translateY(100px);
              }
              to { 
                opacity: 1;
                transform: scale(1) rotate(0deg) translateY(0px);
              }
            }
            
            @keyframes shimmer {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `}</style>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.4); }
          50% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.6), 0 0 40px rgba(13, 148, 136, 0.3); }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes particle-float-0 {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0px); }
          50% { opacity: 1; transform: scale(1) translateY(-10px); }
        }
        
        @keyframes particle-float-1 {
          0%, 100% { opacity: 0; transform: scale(0) translateX(0px); }
          50% { opacity: 1; transform: scale(1) translateX(10px); }
        }
        
        @keyframes particle-float-2 {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0px); }
          50% { opacity: 1; transform: scale(1) translateY(10px); }
        }
        
        @keyframes particle-float-3 {
          0%, 100% { opacity: 0; transform: scale(0) translateX(0px); }
          50% { opacity: 1; transform: scale(1) translateX(-10px); }
        }
        
        @keyframes particle-float-4 {
          0%, 100% { opacity: 0; transform: scale(0) translate(0px, 0px); }
          50% { opacity: 1; transform: scale(1) translate(-7px, -7px); }
        }
        
        @keyframes particle-float-5 {
          0%, 100% { opacity: 0; transform: scale(0) translate(0px, 0px); }
          50% { opacity: 1; transform: scale(1) translate(7px, -7px); }
        }
        
        @keyframes particle-float-6 {
          0%, 100% { opacity: 0; transform: scale(0) translate(0px, 0px); }
          50% { opacity: 1; transform: scale(1) translate(7px, 7px); }
        }
        
        @keyframes particle-float-7 {
          0%, 100% { opacity: 0; transform: scale(0) translate(0px, 0px); }
          50% { opacity: 1; transform: scale(1) translate(-7px, 7px); }
        }
      `}</style>
    </>
  );
};

export default CircularBrandbookButton;