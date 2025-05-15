import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/lib/models";
import { authenticate } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
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

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ArticleResponse>
) {
  try {
    await dbConnect();
    const article = await Article.findById(params.id);

    if (!article) {
      return NextApiResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextApiResponse.json(article);
  } catch (error) {
    console.error("Database Error:", error);
    return NextApiResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextApiRequest, { params }: Props) {
  try {
    const isAuthenticated = await authenticate();
    if (!isAuthenticated) {
      return new NextApiResponse("Unauthorized", { status: 401 });
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
      return NextApiResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextApiResponse.json(article);
  } catch (error: unknown) {
    console.error("Error updating article:", error);
    // if (error instanceof mongoose.Error) {
    //   return NextApiResponse.json({ error: error.message }, { status: 500 });
    // }
    return NextApiResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextApiRequest, { params }: Props) {
  try {
    const isAuthenticated = await authenticate();
    if (!isAuthenticated) {
      return new NextApiResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    const article = await Article.findByIdAndDelete(params.id);

    if (!article) {
      return NextApiResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextApiResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextApiResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
