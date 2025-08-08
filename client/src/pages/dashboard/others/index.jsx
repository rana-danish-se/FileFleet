import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import { apiClient } from '@/utils/apiClient';
import { 
   GET_OTHERS_ROUTE } from '@/utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Others = () => {
  const { token } = useContext(AppContext);
  const [others, setOthers] = useState(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const getDocs = async () => {
      try {
        const res = await apiClient.get(GET_OTHERS_ROUTE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setOthers(res.data.files);
          setSize(res.data.totalSize);
        }
      } catch (error) {
        toast.error('Failed to fetch documents');
      }
    };
    document.title = 'Others - FileFleet';
    getDocs();
  }, []);
  return (
    <div className="w-full p-5 overflow-scroll">
      <Header category="Others" size={size} />
      <div className="w-full mt-10 flex flex-wrap justify-center  gap-6">
        {others?.map((other, index) => (
          <File
            key={index}
            name={other.name}
            createdAt={other.createdAt}
            type={other.type}
            size={other.size}
            category={other.category}
            imageUrl={null}
          />
        ))}
      </div>
    </div>
  );
};

export default Others;
