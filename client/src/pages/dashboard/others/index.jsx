import File from '@/components/File';
import Header from '@/components/Header';
import { AppContext } from '@/context/AppContext';
import loader from '@/assets/assets/icons/loader.svg';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Others = () => {
  const { others, othersSize, getOthers } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOthers = async () => {
      try {
        setLoading(true);
        await getOthers();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching others:', error);
        toast.error('Failed to fetch others');
      }
    };

    document.title = 'Others - FileFleet';
    fetchOthers();
  }, []);
  return loading || !others ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loader} alt="Loading..." />
    </div>
  ) : (
    <div className="w-full min-h-screen p-5 overflow-scroll">
      <Header category="Others" size={othersSize} />
      <div className="w-full mt-10 flex flex-wrap justify-center  gap-6">
        {others.length === 0 && (
          <p className="text-gray-500">No files found in this category.</p>
        )}
        {others?.map((other, index) => (
          <File
            key={index}
            name={other.name}
            createdAt={other.createdAt}
            type={other.type}
            size={other.size}
            fileUrl={other.url}
            category={other.category}
            imageUrl={null}
          />
        ))}
      </div>
    </div>
  );
};

export default Others;
