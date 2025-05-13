import mongoose, { Document } from "mongoose";
const { Schema, model, models } = mongoose;

// Define interfaces for our document types
export interface IAuthor extends Document {
  name: string;
  email: string;
  bio: string;
  avatarUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    medium?: string;
  };
}

export interface ITag extends Document {
  name: string;
  slug: string;
  description?: string;
}

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: IAuthor["_id"];
  tags: string[];
  status: "draft" | "published";
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Author Schema
const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  avatarUrl: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    medium: String,
  },
});

// Tag Schema
const TagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
});

// Article Schema
const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // unique will create an index
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String], // Simple string array for tags
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    featuredImage: String,
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ArticleSchema.index({ status: 1, createdAt: -1 });
ArticleSchema.index({ tags: 1 });

// Helper functions
export async function getArticleById(id: string): Promise<{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
} | null> {
  const dbConnect = (await import("./mongodb")).default;
  await dbConnect();
  const article = await Article.findById(id).select(
    "_id title slug excerpt content tags status"
  );

  if (!article) return null;

  return {
    id: article._id.toString(),
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    tags: article.tags,
    published: article.status === "published",
  };
}

// Models with handling for Next.js hot reloading
export const Author = models.Author || model<IAuthor>("Author", AuthorSchema);
export const Tag = models.Tag || model<ITag>("Tag", TagSchema);
// Using a new collection name to avoid schema conflicts
export const Article =
  models.Article || model<IArticle>("Article", ArticleSchema);
