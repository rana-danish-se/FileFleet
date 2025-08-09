import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import File from '@/components/File';
import Header from '@/components/Header';
import loader from '@/assets/assets/icons/loader.svg';

const Documents = () => {
  const { documents, getDocs, docsSize } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      document.title = 'Documents - FileFleet';
      await getDocs();
      setLoading(false);
    };
    fetchDocs();
    console.log(documents)
  }, []);

  return loading || !documents ? (
    <div className="w-full  flex items-center justify-center">
      <img src={loader} alt="Loading..." />
    </div>
  ) : (
    <div className="w-full min-h-screen p-5 overflow-scroll">
      <Header category="Documents" size={docsSize} />

      <div className="w-full h-full  mt-10 flex flex-wrap justify-center gap-6">
        {documents.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          documents.map((doc, index) => (
            <File
              key={index}
              name={doc.name}
              createdAt={doc.createdAt}
              type={doc.type}
              size={doc.size}
              fileUrl={doc.url}
              imageUrl={null}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;
