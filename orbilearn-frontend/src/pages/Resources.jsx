import React from 'react';
import Navbar from '../components/Navbar';
import TopNewsBar from '../components/TopNewsBar';

const Resources = () => {
  return (
    <>
      <TopNewsBar/>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">🚧 Resources Page Under Construction</h1>
          <p className="text-gray-600 text-lg">We’re preparing helpful resources for you. Please check back soon!</p>
        </div>
      </div>
    </>
  );
};

export default Resources;
