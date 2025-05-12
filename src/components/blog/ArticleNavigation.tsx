"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface ArticleNavProps {
  prevArticle?: {
    slug: string;
    title: string;
  };
  nextArticle?: {
    slug: string;
    title: string;
  };
}

export function ArticleNavigation({
  prevArticle,
  nextArticle,
}: ArticleNavProps) {
  return (
    <div className="flex justify-between items-center py-8 border-t mt-8">
      {prevArticle ? (
        <Button variant="ghost" asChild>
          <Link
            href={`/blog/${prevArticle.slug}`}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Previous</div>
              <div className="text-sm font-medium">{prevArticle.title}</div>
            </div>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextArticle ? (
        <Button variant="ghost" asChild>
          <Link
            href={`/blog/${nextArticle.slug}`}
            className="flex items-center"
          >
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Next</div>
              <div className="text-sm font-medium">{nextArticle.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
