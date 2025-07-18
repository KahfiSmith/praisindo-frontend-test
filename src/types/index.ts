export interface SimpleArticle {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  abstract?: string;
  imageUrl?: string;
  url?: string;
}

export interface ArticleSearchParams {
  q?: string;
  page?: number;
  sort?: 'newest' | 'oldest' | 'relevance';
  begin_date?: string; 
  end_date?: string;   
  fq?: string;
  fl?: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Article {
  headline: {
    main: string;
    kicker?: string;
    print_headline?: string;
  };
  abstract?: string;
  web_url: string;
  snippet?: string;
  lead_paragraph?: string;
  pub_date: string;
  subsection_name?: string;
  multimedia: Array<{
    url: string;
    type: string;
    height: number;
    width: number;
    caption?: string;
  }>;
  byline?: {
    original: string;
  };
  section_name?: string;
  keywords?: Keyword[];
  _id: string;
}

export interface ArticleSearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface CardArticlesProps {
  article: SimpleArticle;
  className?: string;
}
