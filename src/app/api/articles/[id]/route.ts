import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article, IArticle } from "@/lib/models";
import { authenticate } from "@/lib/auth";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

type ArticleResponse = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await dbConnect();
    const { id } = await params;
    const article = await Article.findById(id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const articleResponse: ArticleResponse = {
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      tags: article.tags,
      status: article.status,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };
    return NextResponse.json(articleResponse);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const isAuthenticated = await authenticate();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, excerpt, tags, published } = body;

    const article = await Article.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        excerpt,
        tags,
        status: published ? "published" : "draft",
      },
      { new: true }
    );

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const articleResponse: ArticleResponse = {
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      tags: article.tags,
      status: article.status,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };

    return NextResponse.json(articleResponse);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const isAuthenticated = await authenticate();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const article: IArticle | null = await Article.findByIdAndDelete(id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Article deleted successfully",
      id: article._id?.toString() ?? article.id,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
