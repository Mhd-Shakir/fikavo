import React from 'react';

const FikavoLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <svg viewBox="0 0 180 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <text x="0" y="28" className="fill-brand-dark font-bold text-xl font-poppins">fika</text>
        <text x="60" y="28" className="fill-brand-dark font-light text-xl font-poppins tracking-extrawide">collective</text>
        <rect x="45" y="20" width="8" height="8" className="fill-brand-yellow" />
      </g>
    </svg>
  );
};

export default FikavoLogo;