import { Search } from "lucide-react";

interface TProps {
  searchQuery: string;
  setSearchQuery: (id: string) => void;
  placeholder: string;
}

const SearchBox = ({ searchQuery, setSearchQuery, placeholder }: TProps) => {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`جستجو در ${placeholder}...`}
        className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-2.5 pr-10 text-[#F5F5F5] placeholder-gray-500 focus:border-white/10 focus:outline-none transition"
      />
    </div>
  );
};
 
export default SearchBox;