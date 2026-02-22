// src/Components/LanyardPreview.jsx
import { Suspense } from 'react';
import PropTypes from 'prop-types';
import Lanyard from './Lanyard';

LanyardPreview.propTypes = {
  year: PropTypes.number,
};

export default function LanyardPreview({ year = 2025 }) {
  const is2026 = year === 2026;
  const badgeText = is2026 ? "HackHayward 2.0" : "HackHayward";
  
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold font-exo2 mb-4">
        Your {badgeText} Virtual Badge
      </h2>
      <p className="text-white/80 mb-4 font-grotesk">
        Here&apos;s a preview of your {badgeText} event badge. Drag to interact.
      </p>
      
      <div className="h-[400px] bg-gradient-to-b from-[#30252d]/50 to-[#261e24]/50 rounded-lg">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">📛</div>
              <p>Loading badge...</p>
            </div>
          </div>
        }>
          <Lanyard />
        </Suspense>
      </div>
      
      <div className="mt-4 text-center text-sm text-white/60 font-grotesk">
        Drag to rotate • Your physical badge will be provided at check-in
      </div>
    </div>
  );
}