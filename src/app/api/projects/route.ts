import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/lib/models";
import { authenticate } from "@/lib/auth";

interface ProjectQuery {
  status?: "published" | "draft";
  featured?: boolean;
}

interface ProjectBody {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  demoUrl?: string;
  sourceUrls: {
    github?: string;
    gitlab?: string;
    other?: string;
  };
  technologies: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
  features: string[];
  published: boolean;
  featured: boolean;
  startDate?: string;
  endDate?: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query: ProjectQuery = {};

    // Status filter
    const status = searchParams.get("status");
    if (status === "published") {
      query.status = "published";
    }

    // Get featured parameter
    const featured = searchParams.get("featured");
    if (featured === "true") {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ projects });
  } catch (error: unknown) {
    console.error("Database Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = (await request.json()) as ProjectBody;

    const project = new Project({
      ...body,
      status: body.published ? "published" : "draft",
    });

    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
