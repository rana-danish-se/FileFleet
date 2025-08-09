import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import loader from '@/assets/assets/icons/loader.svg';
import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';

const Images = () => {
  const { images, getImages, imageSize } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getImages();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading;
      }
    };

    document.title = 'Images - FileFleet';
    console.log(images);
    fetchData();
  }, []);
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults(images);
    } else {
      const filtered = images.filter((img) =>
        img.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, images]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  return loading || !images ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loader} alt="" />
    </div>
  ) : (
    <div className='className="w-full  p-5 overflow-scroll"'>
      <div className="flex items-center justify-between">
        <Header category="Images" size={imageSize} />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {filteredResults?.length === 0 && (
          <p className="text-gray-500">No images found.</p>
        )}
        {filteredResults?.map((image, index) => (
          <File
            key={index}
            name={image.name}
            createdAt={image.createdAt}
            type={image.type}
            size={image.size}
            imageUrl={image.url}
            fileId={image._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
