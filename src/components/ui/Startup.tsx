import React, { useState } from 'react';
import { CheckSquare, Square, Package, TrendingUp, Globe, Video, BarChart3, X, Rocket } from 'lucide-react';

const BusinessStartupPackage = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const CheckboxItem = ({ id, label, icon = null }) => {
    const isChecked = checkedItems[id] || false;
    
    const handleClick = (e) => {
      e.stopPropagation();
      toggleCheck(id);
    };

    return (
      <div 
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={handleClick}
      >
        {isChecked ? (
          <CheckSquare className="text-green-600 w-4 h-4 flex-shrink-0" />
        ) : (
          <Square className="text-gray-400 w-4 h-4 flex-shrink-0" />
        )}
        {icon && <span className="text-blue-600">{icon}</span>}
        <span className={`${isChecked ? 'text-green-700 line-through' : 'text-gray-700'} text-sm font-medium`}>
          {label}
        </span>
      </div>
    );
  };

  const SectionHeader = ({ title, icon, color = "text-blue-600" }) => (
    <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-200">
      <span className={color}>{icon}</span>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
  );

  const SubSection = ({ title, children }) => (
    <div className="ml-4 mb-3">
      <h4 className="text-sm font-semibold text-gray-600 mb-2">{title}</h4>
      <div className="ml-3">
        {children}
      </div>
    </div>
  );

  // Calculate progress
  const totalItems = 18; // Total number of checkboxes
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Main Button */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Launch Your Business</h1>
        <button
          onClick={openModal}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
        >
          <Rocket className="w-6 h-6 group-hover:animate-pulse" />
          <span>STARTUP BUSINESS PACKAGE</span>
          <Package className="w-6 h-6" />
        </button>
        <p className="text-gray-600 mt-4 text-lg">Complete business solution in one package</p>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Package className="w-8 h-8" />
                <h2 className="text-2xl font-bold">STARTUP BUSINESS PACKAGE</h2>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-center text-sm">
                Progress: {checkedCount}/{totalItems} items completed ({progressPercentage}%)
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Brand Identity */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <SectionHeader 
                      title="Brand Identity" 
                      icon={<Package className="w-5 h-5" />}
                      color="text-purple-600"
                    />
                    <div className="space-y-1">
                      <CheckboxItem id="name" label="Business Name" />
                      <CheckboxItem id="logo" label="Logo Design" />
                      <CheckboxItem id="brandbook" label="Brand Book" />
                      <CheckboxItem id="logoPoster" label="Logo Poster" />
                      <CheckboxItem id="mainPoster" label="Main Poster" />
                    </div>
                  </div>

                  {/* Website Development */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <SectionHeader 
                      title="Website Development" 
                      icon={<Globe className="w-5 h-5" />}
                      color="text-blue-600"
                    />
                    <div className="space-y-1">
                      <CheckboxItem id="website-basic" label="Basic Website" />
                      <CheckboxItem id="website-standard" label="Standard Website" />
                      <CheckboxItem id="website-advanced" label="Advanced Website" />
                    </div>
                  </div>

                  {/* Poster Design */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <SectionHeader 
                      title="Poster Design" 
                      icon={<Package className="w-5 h-5" />}
                      color="text-green-600"
                    />
                    <div className="space-y-1">
                      <CheckboxItem id="posters-daily" label="Daily Posters" />
                      <CheckboxItem id="posters-weekly" label="Weekly Posters" />
                      <CheckboxItem id="posters-monthly" label="Monthly Posters" />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Video Editing */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <SectionHeader 
                      title="Video Editing" 
                      icon={<Video className="w-5 h-5" />}
                      color="text-red-600"
                    />
                    <div className="space-y-1">
                      <CheckboxItem id="video-choice4" label="Choice 4 Package" />
                      <CheckboxItem id="video-weekly" label="Weekly Video Editing" />
                      <CheckboxItem id="video-monthly" label="Monthly Video Editing" />
                    </div>
                  </div>

                  {/* Digital Marketing */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <SectionHeader 
                      title="Digital Marketing" 
                      icon={<TrendingUp className="w-5 h-5" />}
                      color="text-orange-600"
                    />
                    
                    <SubSection title="Analytics & SEO">
                      <CheckboxItem id="analytics" label="Website Analytics Setup" />
                      <CheckboxItem id="seo" label="SEO Optimization" />
                    </SubSection>

                    <SubSection title="Social Media Boost">
                      <div className="space-y-1">
                        <CheckboxItem id="boost-instagram" label="Instagram Boost" />
                        <div className="ml-3 mt-2">
                          <p className="text-xs font-medium text-gray-600 mb-1">Facebook:</p>
                          <div className="ml-2 space-y-1">
                            <CheckboxItem id="boost-facebook" label="Facebook Boost" />
                            <CheckboxItem id="boost-facebook-weekly" label="Weekly Management" />
                            <CheckboxItem id="boost-facebook-monthly" label="Monthly Management" />
                          </div>
                        </div>
                      </div>
                    </SubSection>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg text-white">
                    <h3 className="font-bold mb-3 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Package Benefits
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>✓ Brand Identity</div>
                      <div>✓ Web Development</div>
                      <div>✓ Content Creation</div>
                      <div>✓ Video Production</div>
                      <div>✓ Digital Marketing</div>
                      <div>✓ Social Media</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/20 text-center">
                      <p className="font-semibold text-sm">
                        {progressPercentage === 100 ? "🎉 Package Complete!" : "🚀 Everything You Need to Start!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessStartupPackage;