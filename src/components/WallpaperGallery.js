import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const WallpaperGallery = ({ refreshTrigger }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWallpapers = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setWallpapers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWallpapers();
  }, [refreshTrigger]);

  const handleDelete = async (wallpaper) => {
    const { error: deleteError } = await supabase.storage
      .from('wallpapers')
      .remove([wallpaper.file_name]);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from('wallpapers')
      .delete()
      .eq('id', wallpaper.id);

    if (dbError) {
      setError(dbError.message);
    } else {
      fetchWallpapers();
    }
  };

  if (loading) {
    return <p>Loading wallpapers...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Uploaded Wallpapers</h2>
      {wallpapers.length === 0 ? (
        <p>No wallpapers uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="overflow-hidden bg-white rounded-lg shadow-md">
              <img src={wallpaper.file_url} alt={wallpaper.title} className="object-cover w-full h-48" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{wallpaper.title}</h3>
                <p className="text-sm text-gray-600">{wallpaper.description}</p>
                <button
                  onClick={() => handleDelete(wallpaper)}
                  className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WallpaperGallery;
