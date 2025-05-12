import dbConnect from "@/lib/mongodb";
import { Article } from "@/lib/models";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { Pagination } from "@/components/blog/Pagination";

interface SearchParams {
  q?: string;
  tag?: string;
  page?: string;
}

async function getPublishedArticles(searchParams: SearchParams) {
  await dbConnect();

  const page = parseInt(searchParams.page || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = { status: "published" };
  if (searchParams.q) {
    query.$or = [
      { title: { $regex: searchParams.q, $options: "i" } },
      { excerpt: { $regex: searchParams.q, $options: "i" } },
      { content: { $regex: searchParams.q, $options: "i" } },
    ];
  }
  if (searchParams.tag) {
    query.tags = searchParams.tag;
  }

  // Get articles
  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("title excerpt slug createdAt tags");

  // Get total count for pagination
  const total = await Article.countDocuments(query);

  // Get all unique tags for the filter
  const allTags = await Article.distinct("tags", { status: "published" });

  return {
    articles,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      current: page,
    },
    tags: allTags,
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { articles, pagination, tags } = await getPublishedArticles(
    searchParams
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
