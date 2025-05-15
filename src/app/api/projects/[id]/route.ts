import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/lib/models";
import { authenticate } from "@/lib/auth";

interface Props {
  params: Promise<{
    id: string;
  }>;
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

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await dbConnect();
    const {id} = await params
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
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

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const {id} = await params
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = (await request.json()) as ProjectBody;

    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...body,
        status: body.published ? "published" : "draft",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: unknown) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const {id} = await params
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
