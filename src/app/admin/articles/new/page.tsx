"use client";

import {
  ArticleForm,
  type ArticleFormData,
} from "@/components/editor/ArticleForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create New Article</h1>
        <Button asChild variant="outline">
          <Link href="/admin/articles">Cancel</Link>
        </Button>
      </div>
      <ArticleForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onCancel={() => router.push("/admin/articles")}
      />
    </div>
  );
}
