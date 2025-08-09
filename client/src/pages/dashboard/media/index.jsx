import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import loader from '@/assets/assets/icons/loader.svg';

const Media = () => {
  const { getMedia, mediaSize, media } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        await getMedia();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching media:', error);
        setLoading(false);
      }
    };

    document.title = 'Media - FileFleet';
    fetchMedia();
  }, []);
  return loading || !media ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loader} alt="" />
    </div>
  ) : (
    <div className="w-full p-5 overflow-scroll">
      <Header category="Media" size={mediaSize} />
      <div className="w-full mt-10 flex flex-wrap justify-center  gap-6">
        {media.length === 0 && (
          <p className="text-gray-500">No media files found.</p>
        )}
        {media?.map((med, index) => (
          <File
            key={index}
            name={med.name}
            createdAt={med.createdAt}
            type={med.type}
            size={med.size}
            category={med.category}
            fileUrl={med.url}
            imageUrl={null}
          />
        ))}
      </div>
    </div>
  );
};

export default Media;
