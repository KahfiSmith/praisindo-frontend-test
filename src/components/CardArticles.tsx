import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import { CardArticlesProps } from "@/types";
import { CalendarIcon, UserIcon } from "lucide-react";

export function CardArticles({ article, className }: CardArticlesProps) {
  const { title, author, publishedDate, abstract, url } = article;
  
  const truncatedAbstract = abstract ? 
    abstract.length > 100 ? `${abstract.substring(0, 100)}...` : abstract 
    : "";

  const truncateAuthor = author ? 
    author.length > 20 ? `${author.substring(0, 20)}...` : author 
    : "";
    
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/80 to-white/40 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:cursor-pointer h-full",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
      
      <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 h-full">
        <h3 className="line-clamp-2 text-base sm:text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
          {title}
        </h3>
        
        {truncatedAbstract && (
          <p className="text-xs sm:text-sm text-gray-600">{truncatedAbstract}</p>
        )}
        
        <div className="mt-auto pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <UserIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-500" />
            {truncateAuthor && (
              <span className="text-[10px] sm:text-xs">{truncateAuthor || "Unknown"}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 sm:gap-1.5">
            <CalendarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
            <span className="text-[10px] sm:text-xs">{formatDate(publishedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
