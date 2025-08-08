import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import { apiClient } from '@/utils/apiClient';
import { GET_MEDIA_ROUTE } from '@/utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Media = () => {
  const { token } = useContext(AppContext);
  const [media, setMedia] = useState(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const getDocs = async () => {
      try {
        const res = await apiClient.get(GET_MEDIA_ROUTE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setMedia(res.data.files);
          setSize(res.data.totalSize);
        }
      } catch (error) {
        toast.error('Failed to fetch documents');
      }
    };
    document.title = 'Media - FileFleet';
    getDocs();
  }, []);
  return (
    <div className="w-full p-5 overflow-scroll">
      <Header category="Media" size={size} />
      <div className="w-full mt-10 flex flex-wrap justify-center  gap-6">
        {media?.map((med, index) => (
          <File
            key={index}
            name={med.name}
            createdAt={med.createdAt}
            type={med.type}
            size={med.size}
            category={med.category}
            imageUrl={null}
          />
        ))}
      </div>
    </div>
  );
};

export default Media;
