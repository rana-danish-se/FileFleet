import search from '@/assets/assets/icons/search.svg';

const SearchBar = ({searchTerm, setSearchTerm, handleSearchChange}) => {
  return (
    <div className="flex sm:w-md w-full rounded-md gap-2 items-center bg-gray-900 text-white justify-center">
      <img src={search} alt="" />
      <input
        placeholder="Search File"
        onChange={(e)=>handleSearchChange(e.target.value)}
        type="text"
        value={searchTerm}
        className="bg-transparent border-none outline-none p-4"
      />
    </div>
  );
};

export default SearchBar;
