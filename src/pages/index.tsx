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

  const fetchArticles = async (query: string = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const articles = query 
        ? await searchSimpleArticles(query) 
        : await getSimpleArticles({ sort: "newest", page: 0 });
      
      setArticles(articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch articles");
      console.error("Error fetching articles:", err);
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

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-3xl font-bold text-gray-900">The New York Times Articles</h1>

        <div className="flex justify-start mb-8">
          <div className="w-full max-w-lg">
            <Label htmlFor="search-articles" className="mb-3 block text-gray-700">
              Search Articles
            </Label>
            <input
              id="search-articles"
              type="text"
              placeholder="Search articles"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600"></div>
          </div>
        )}
        
        {error && (
          <div className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-center text-red-800">
            <p>{error}</p>
            <p className="mt-2 text-sm">Please check your API key and try again.</p>
          </div>
        )}
        
        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-gray-600">
            <p>No articles found.</p>
          </div>
        )}
        
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <CardArticles key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
