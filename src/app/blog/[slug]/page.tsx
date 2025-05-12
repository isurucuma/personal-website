import dbConnect from "@/lib/mongodb";
import { Article } from "@/lib/models";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

interface Props {
  params: {
    slug: string;
  };
}

async function getArticleWithNavigation(slug: string) {
  await dbConnect();

  // Get current article
  const article = await Article.findOne({ slug, status: "published" }).select(
    "title content excerpt createdAt"
  );

  if (!article) return { article: null };

  // Get previous and next articles
  const [prevArticle, nextArticle] = await Promise.all([
    Article.findOne({
      status: "published",
      createdAt: { $gt: article.createdAt },
    })
      .sort({ createdAt: 1 })
      .select("title slug"),

    Article.findOne({
      status: "published",
      createdAt: { $lt: article.createdAt },
    })
      .sort({ createdAt: -1 })
      .select("title slug"),
  ]);

  return {
    article,
    navigation: {
      prev: prevArticle
        ? {
            title: prevArticle.title,
            slug: prevArticle.slug,
          }
        : undefined,
      next: nextArticle
        ? {
            title: nextArticle.title,
            slug: nextArticle.slug,
          }
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { article, navigation } = await getArticleWithNavigation(slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-8">
          <time className="text-sm text-muted-foreground">
            {new Date(article.createdAt).toLocaleDateString()}
          </time>
          <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Add article navigation */}
        <ArticleNavigation
          prevArticle={navigation && navigation.prev}
          nextArticle={navigation && navigation.next}
        />
      </article>
    </div>
  );
}
