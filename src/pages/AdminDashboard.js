import React, { useState } from 'react';
import WallpaperUploadForm from '../components/WallpaperUploadForm';
import WallpaperGallery from '../components/WallpaperGallery';

const AdminDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpload = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Admin Dashboard</h1>
      <WallpaperUploadForm onUpload={handleUpload} />
      <WallpaperGallery refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default AdminDashboard;
