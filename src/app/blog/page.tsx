import { BlogSearch } from "@/components/blog/BlogSearch";
import { Pagination } from "@/components/blog/Pagination";

interface SearchParams {
  q?: string | string[];
  tag?: string | string[];
  page?: string | string[];
}

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  tags: string[];
}

interface ArticleResponse {
  articles: Article[];
  pagination: {
    total: number;
    pages: number;
    current: number;
  };
  tags: string[];
}

async function getPublishedArticles(
  params: SearchParams
): Promise<ArticleResponse> {
  const searchParams = new URLSearchParams();

  // Add status filter
  searchParams.append("status", "published");

  // Add search query if exists
  if (params.q) {
    const query = Array.isArray(params.q) ? params.q[0] : params.q;
    if (query) searchParams.append("q", query);
  }

  // Add tag filter if exists
  if (params.tag) {
    const tag = Array.isArray(params.tag) ? params.tag[0] : params.tag;
    if (tag) searchParams.append("tag", tag);
  }

  // Add pagination
  const page = Array.isArray(params.page) ? params.page[0] : params.page ?? "1";
  searchParams.append("page", page);
  searchParams.append("limit", "10");

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/articles?${searchParams.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export default async function BlogPage({
  searchParams,
}: Readonly<{ searchParams: SearchParams }>) {
  const resolvedParams = await Promise.resolve(searchParams);
  const { articles, pagination, tags } = await getPublishedArticles(
    resolvedParams
  );
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Blog & Articles</h1>

      <div className="mb-8">
        <BlogSearch tags={tags} />
      </div>

      <div className="space-y-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article
              key={article._id.toString()}
              className="border rounded-lg p-6 hover:bg-secondary/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <h2 className="text-2xl font-semibold hover:text-primary">
                  <a href={`/blog/${article.slug}`}>{article.title}</a>
                </h2>
                <p className="text-muted-foreground">{article.excerpt}</p>
                <a
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                >
                  Read more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No articles published yet.</p>
          </div>
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.current}
            totalPages={pagination.pages}
            baseUrl="/blog"
          />
        </div>
      )}
    </div>
  );
}
