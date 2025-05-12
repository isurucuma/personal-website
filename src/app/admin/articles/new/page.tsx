import { ArticleForm } from "@/components/editor/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
      <ArticleForm />
    </div>
  );
}
