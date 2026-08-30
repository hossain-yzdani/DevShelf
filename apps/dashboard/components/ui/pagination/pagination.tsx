import { ChevronLeft, ChevronRight } from "lucide-react";

interface TProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (id: any) => void;
}

const Pagination = ({ totalPages, currentPage, setCurrentPage }: TProps) => {
  return (
    <>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-[#171717] border border-white/5 text-gray-400 hover:text-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={18} />
          </button>
          <span className="text-sm text-gray-400">
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-[#171717] border border-white/5 text-gray-400 hover:text-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      )}
    </>
  );
}
 
export default Pagination;