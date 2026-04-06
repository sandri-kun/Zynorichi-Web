import { Link } from '@/i18n/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 my-12">
      {currentPage > 1 && (
        <Link 
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded-md hover:bg-gray-50 font-medium"
        >
          Previous
        </Link>
      )}
      
      <span className="px-4 py-2 text-gray-700 bg-gray-50 rounded-md font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages && (
        <Link 
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded-md hover:bg-gray-50 font-medium"
        >
          Next
        </Link>
      )}
    </div>
  );
}
