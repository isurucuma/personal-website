"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  status: "draft" | "published";
  publishedAt?: string;
  updatedAt: string;
}

export default function ArticlesManagementPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles?includeAll=true");
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/articles/new">New Article</Link>
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Last Updated</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {articles.map((article) => (
              <tr key={article._id}>
                <td className="px-6 py-4">{article.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      article.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(article.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/articles/edit/${article._id}`}>
                      Edit
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
