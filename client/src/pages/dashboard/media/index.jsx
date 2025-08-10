import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import loader from '@/assets/assets/icons/loader.svg';
import SearchBar from '@/components/SearchBar';

const Media = () => {
  const { getMedia, mediaSize, media } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

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
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults(media);
    } else {
      const filtered = media.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, media]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  return loading || !media ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loader} alt="" />
    </div>
  ) : (
    <div className="w-full min-h-screen p-5 overflow-scroll">
      <div className="flex items-center justify-between">
        <Header category="Media" size={mediaSize} />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <div className="w-full mt-10 flex flex-wrap justify-center  gap-6">
        {filteredResults?.length === 0 && (
          <p className="text-gray-500">No media files found.</p>
        )}
        {filteredResults?.map((med, index) => (
          <File
             key={index}
              name={med.name}
              originalName={med.originalName}
              publicId={med.publicId}
              extension={med.extension}
              createdAt={med.createdAt}
              type={med.type}
              size={med.size}
              fileUrl={med.url}
              imageUrl={null}
              fileId={med._id}
              category={med.category}
              resourceType={med.resourceType}
          />
        ))}
      </div>
    </div>
  );
};

export default Media;
