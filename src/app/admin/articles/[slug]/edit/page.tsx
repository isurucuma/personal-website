"use client";

import {
  ArticleForm,
  type ArticleFormData,
} from "@/components/editor/ArticleForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Using Record type for searchParams to match Next.js types
type Props = {
  params: Promise<{ slug: string }>;
};

interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export default function EditArticlePage({ params }: Props) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articleSlug, setArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = params instanceof Promise ? await params : params;
      setArticleSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${articleSlug}`);
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleSlug]);

  const handleUpdateArticle = async (formData: ArticleFormData) => {
    if (!article) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${article._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update article");
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (!article) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Button asChild>
            <Link href="/admin/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <Button asChild variant="outline">
          <Link href="/admin/articles">Cancel</Link>
        </Button>
      </div>

      <ArticleForm
        initialData={{
          id: article._id,
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          tags: article.tags,
          published: article.status === "published",
        }}
        onSubmit={handleUpdateArticle}
        isSubmitting={isSubmitting}
        onCancel={() => router.push("/admin/articles")}
      />
    </div>
  );
}
