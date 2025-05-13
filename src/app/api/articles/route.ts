import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/lib/models";
import { authenticate } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const tag = searchParams.get("tag");
    const q = searchParams.get("q");
    const status = searchParams.get("status");

    // Build the query object
    const query: any = {};

    // Status filter
    if (status === "published") {
      query.status = "published";
    } else if (searchParams.get("includeAll") !== "true") {
      // Default to published if not explicitly requesting all
      query.status = "published";
    }

    // Tag filter
    if (tag) {
      query.tags = tag;
    }

    // Search query
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Get articles with pagination and sorting
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title slug excerpt tags status createdAt updatedAt");

    // Get total count for pagination
    const total = await Article.countDocuments(query);

    // Get all unique tags for the filter (only published articles)
    const tags = await Article.distinct("tags", { status: "published" });

    return NextResponse.json({
      articles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      tags,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await authenticate(request);
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { title, slug, content, excerpt, tags, published } = body;

    const article = new Article({
      title,
      slug,
      content,
      excerpt,
      tags,
      status: published ? "published" : "draft",
    });

    await article.save();

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await authenticate(request);
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { title, slug, content, excerpt, tags, published } = body;

    const article = await Article.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        excerpt,
        tags,
        status: published ? "published" : "draft",
      },
      { new: true }
    );

    if (!article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error: any) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
