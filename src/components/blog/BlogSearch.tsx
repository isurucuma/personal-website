"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";

interface BlogSearchProps {
  tags: string[];
}

export function BlogSearch({ tags }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const currentTag = searchParams.get("tag");

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (currentTag) params.set("tag", currentTag);
      router.push(`/blog?${params.toString()}`);
    });
  };

  const handleTagClick = (tag: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (params.get("tag") === tag) {
        params.delete("tag");
      } else {
        params.set("tag", tag);
      }
      router.push(`/blog?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isPending}>
          Search
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={currentTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagClick(tag)}
              disabled={isPending}
            >
              {tag}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
