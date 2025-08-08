import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import { apiClient } from '@/utils/apiClient';
import { GET_IMAGES_ROUTE } from '@/utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Images = () => {
  const { token } = useContext(AppContext);
  const [images, setImages] = useState(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await apiClient.get(GET_IMAGES_ROUTE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setImages(res.data.files);
          setSize(res.data.totalSize);
        }
      } catch (error) {
        toast.error('Failed to fetch images');
      }
    };
    document.title = 'Images - FileFleet';
    getImages();
  }, []);
  return (
    <div className='className="w-full  p-5 overflow-scroll"'>
      <Header category="Images" size={size} />
        <div className="mt-10 flex flex-wrap justify-center gap-6">{
        images?.map((image,index)=>(
          <File
            key={index}
            name={image.name}
            createdAt={image.createdAt}
            type={null}
            size={image.size}
            imageUrl={image.url}/>
        ))
        
        }</div>
    </div>
  );
};

export default Images;
