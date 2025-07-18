import { useState, useEffect } from "react";
import { CardArticles } from "@/components/CardArticles";
import { SimpleArticle } from "@/types";
import { getSimpleArticles, searchSimpleArticles } from "@/lib/api/nytimes";
import { Label } from "@/components/ui/label";

export default function Index() {
  const [articles, setArticles] = useState<SimpleArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const fetchArticles = async (query: string = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const trimmedQuery = query.trim();
      
      if (trimmedQuery) {
        setIsSearchActive(true);
        console.log(`Searching for: "${trimmedQuery}"`);
        
        const searchResults = await searchSimpleArticles(trimmedQuery);
        
        if (searchResults.length === 0) {
          setError(`No articles found matching "${trimmedQuery}"`);
          setArticles([]);
        } else {
          console.log(`Found ${searchResults.length} articles`);
          setArticles(searchResults);
        }
      } else {
        setIsSearchActive(false);
        console.log("Fetching latest articles");
        
        const latestArticles = await getSimpleArticles({ 
          sort: "newest", 
          page: 0 
        });
        
        if (latestArticles.length === 0) {
          setError("No articles available");
          setArticles([]);
        } else {
          setArticles(latestArticles);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch articles";
      setError(errorMessage);
      console.error("Error fetching articles:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchArticles(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-6 sm:mb-8 md:mb-12 text-center text-2xl sm:text-3xl font-bold text-gray-900">
          The New York Times Articles
        </h1>

        <div className="flex justify-center sm:justify-start mb-6 sm:mb-8">
          <div className="w-full max-w-full sm:max-w-lg">
            <Label htmlFor="search-articles" className="mb-2 sm:mb-3 block text-sm sm:text-base text-gray-700">
              Search Articles
            </Label>
            <div className="relative">
              <input
                id="search-articles"
                type="text"
                placeholder="Search articles (e.g., 'climate change', 'technology')"
                className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base pr-10"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
            {isSearchActive && (
              <p className="mt-1 text-xs text-gray-500">
                Searching for: "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-6 sm:py-10">
            <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600"></div>
          </div>
        )}
        
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-lg bg-red-50 p-3 sm:p-4 text-center text-red-800 text-sm sm:text-base">
            <p>{error}</p>
            {!isSearchActive && (
              <p className="mt-2 text-xs sm:text-sm">Please check your API key and try again.</p>
            )}
            {isSearchActive && (
              <div className="mt-2 text-xs sm:text-sm">
                <p>Try using different keywords or check your spelling.</p>
                <p className="mt-1 text-gray-600">
                  Search tips: Use common words, try synonyms, or search for topics instead of names.
                </p>
              </div>
            )}
          </div>
        )}
        
        {!loading && !error && articles.length === 0 && (
          <div className="mx-auto max-w-md rounded-lg bg-red-50 p-3 sm:p-4 text-center">
            <p className="text-red-800">No articles found matching "{searchQuery}"</p>
            <p className="mt-2 text-xs sm:text-sm text-gray-700">Try using different keywords or check your spelling.</p>
            <p className="mt-1 text-xs text-gray-600">Search tips: Use common words, try synonyms, or search for topics instead of names.</p>
          </div>
        )}
        
        {!loading && !error && articles.length > 0 && (
          <>
            <div className="mb-4 text-center text-sm text-gray-600">
              {isSearchActive 
                ? `Found ${articles.length} articles for "${searchQuery}"`
                : `Showing ${articles.length} latest articles`
              }
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {articles.map((article) => (
                <CardArticles key={article.id} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}