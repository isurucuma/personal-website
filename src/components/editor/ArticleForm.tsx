"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArticleEditor } from "./ArticleEditor";

interface ArticleFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    tags: string[];
    published: boolean;
  };
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    tags: initialData?.tags?.join(", ") || "",
    published: initialData?.published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        initialData?.id ? `/api/articles/${initialData.id}` : "/api/articles",
        {
          method: initialData?.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            tags: formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save article");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error saving article:", error);
      // Handle error (show toast notification, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <ArticleEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
