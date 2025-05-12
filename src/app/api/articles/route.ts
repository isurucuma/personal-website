import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/lib/models";
import { authenticate } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const tag = searchParams.get("tag");

    const query = {
      ...(searchParams.get("includeAll") !== "true" && { published: true }),
      ...(tag && { tags: tag }),
    };

    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title slug excerpt tags published createdAt updatedAt");

    const total = await Article.countDocuments(query);

    return NextResponse.json({
      articles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
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
