import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import loader from '@/assets/assets/icons/loader.svg';
import React, { useContext, useEffect, useState } from 'react';

const Images = () => {
  const { images, getImages, imageSize } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  

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
    fetchData();
  }, []);
  return loading || !images ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loader} alt="" />
    </div>
  ) : (
    <div className='className="w-full  p-5 overflow-scroll"'>
      <Header category="Images" size={imageSize} />
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {images.length === 0 && (
          <p className="text-gray-500">No images found.</p>
        )}
        {images?.map((image, index) => (
          <File
            key={index}
            name={image.name}
            createdAt={image.createdAt}
            type={null}
            size={image.size}
            imageUrl={image.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
