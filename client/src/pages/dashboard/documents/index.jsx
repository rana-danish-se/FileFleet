import { AppContext } from '@/context/AppContext';
import { apiClient } from '@/utils/apiClient';
import { GET_DOCUMENTS_ROUTE } from '@/utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import File from '@/components/File'; 
import Header from '@/components/Header';

const Documents = () => {
  const { token } = useContext(AppContext);
  const [documents, setDocuments] = useState(null);
  const [setsize, setSetsize] = useState(null);
  useEffect(() => {
    const getDocs = async () => {
      try {
        const res = await apiClient.get(GET_DOCUMENTS_ROUTE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setDocuments(res.data.files);
          setSetsize(res.data.totalSize);
        }
      } catch (error) {
        toast.error('Failed to fetch documents');
      }
    };
    document.title = 'Documents - FileFleet';
    getDocs();
  }, []);
  return (
    <div className="w-full p-5 overflow-scroll">
      <Header category="Documents" size={setsize} />
      {/* Displaying the documents */}
      <div className="w-full mt-10 flex flex-wrap justify-center  gap-6">{
        documents?.map((doc,index)=>(
          <File
            key={index}
            name={doc.name}
            createdAt={doc.createdAt}
            type={doc.type}
            size={doc.size}
            imageUrl={null}/>
        ))
        
        }</div>
    </div>
  );
};

export default Documents;
