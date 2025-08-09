import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import File from '@/components/File';
import Header from '@/components/Header';
import loader from '@/assets/assets/icons/loader.svg';
import SearchBar from '@/components/SearchBar';

const Documents = () => {
  const { documents, getDocs, docsSize } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      document.title = 'Documents - FileFleet';
      await getDocs();
      setLoading(false);
    };
    fetchDocs();
  }, []);

  // Update filtered results when documents or search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults(documents);
    } else {
      const filtered = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, documents]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return loading || !documents ? (
    <div className="w-full flex items-center justify-center">
      <img src={loader} alt="Loading..." />
    </div>
  ) : (
    <div className="w-full min-h-screen p-5 overflow-scroll">
      <div className="flex items-center justify-between">
        <Header category="Documents" size={docsSize} />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>

      <div className="w-full h-full mt-10 flex flex-wrap justify-center gap-6">
        {filteredResults.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          filteredResults.map((doc, index) => (
            <File
              key={index}
              name={doc.name}
              createdAt={doc.createdAt}
              type={doc.type}
              size={doc.size}
              fileUrl={doc.url}
              imageUrl={null}
              fileId={doc._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;
