import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/lib/models";
import { authenticate } from "@/lib/auth";
import mongoose from "mongoose";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await dbConnect();
    const article = await Article.findById(params.id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
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
    const isAuthenticated = await authenticate(request);
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { title, slug, content, excerpt, tags, published } = body;

    const article = await Article.findByIdAndUpdate(
      params.id,
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

    return NextResponse.json(article);
  } catch (error: unknown) {
    console.error("Error updating article:", error);
    // if (error instanceof mongoose.Error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 });
    // }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const isAuthenticated = await authenticate(request);
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    const article = await Article.findByIdAndDelete(params.id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
