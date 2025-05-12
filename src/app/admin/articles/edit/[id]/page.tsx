import { ArticleForm } from "@/components/editor/ArticleForm";
import { getArticleById } from "@/lib/models";

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
      <ArticleForm
        initialData={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          tags: article.tags,
          published: article.published,
        }}
      />
    </div>
  );
}
