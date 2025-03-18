'use client';

// components/FirstVisitPopup.tsx
import { useEffect, useState } from 'react';

const FirstVisitPopup = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check localStorage to see if it's the first visit
    if (!localStorage.getItem('hasVisited')) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsFirstVisit(false);
  };

  if (!isFirstVisit) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Welcome to our site!</h2>
        <p className="mb-4">We're glad you're here. Use the buttons to navigate resources. Please create an account to get personalized resources matched to you.</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstVisitPopup;
