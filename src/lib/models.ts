import mongoose, { Document, Model, Schema } from "mongoose";
const { model, models } = mongoose;

// Project interfaces and schema
export interface IProject extends Document {
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
  status: "draft" | "published";
  featured: boolean;
  startDate: Date;
  endDate?: Date;
}

// Article interfaces and schema
export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

// Resume Interfaces
interface ISocialLinks {
  github?: string;
  linkedin?: string;
  medium?: string;
  [key: string]: string | undefined;
}

export interface IBasicInfo {
  name: string;
  title: string;
  location: string;
  socialLinks: ISocialLinks;
  summary: string;
}

export interface IExperience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  responsibilities: string[];
}

export interface ISkillCategory {
  name: string;
  skills: string[];
}

export interface IEducation {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
  gpa?: string;
  honors?: string;
}

export interface ICertification {
  name: string;
  issuer: string;
  date: Date;
}

export interface IResume extends Document {
  basicInfo: IBasicInfo;
  experiences: IExperience[];
  skillCategories: ISkillCategory[];
  education: IEducation[];
  certifications: ICertification[];
  updatedAt: Date;
}

// Project Schema
const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: String,
    thumbnail: String,
    demoUrl: String,
    sourceUrls: {
      github: String,
      gitlab: String,
      other: String,
    },
    technologies: {
      languages: [String],
      frameworks: [String],
      databases: [String],
      tools: [String],
    },
    features: [String],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ProjectSchema.index({ status: 1, featured: 1, createdAt: -1 });

// Article Schema
const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ArticleSchema.index({ status: 1, createdAt: -1 });
ArticleSchema.index({ tags: 1 });

// Resume Schemas
const BasicInfoSchema = new Schema<IBasicInfo>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  socialLinks: {
    github: String,
    linkedin: String,
    medium: String,
  },
  summary: { type: String, required: true },
});

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  current: { type: Boolean, default: false },
  responsibilities: [{ type: String }],
});

const SkillCategorySchema = new Schema<ISkillCategory>({
  name: { type: String, required: true },
  skills: [{ type: String }],
});

const EducationSchema = new Schema<IEducation>({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  gpa: String,
  honors: String,
});

const CertificationSchema = new Schema<ICertification>({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date, required: true },
});

const ResumeSchema = new Schema<IResume>({
  basicInfo: { type: BasicInfoSchema, required: true },
  experiences: [ExperienceSchema],
  skillCategories: [SkillCategorySchema],
  education: [EducationSchema],
  certifications: [CertificationSchema],
  updatedAt: { type: Date, default: Date.now },
});

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

  const article: IArticle | null = await Article.findById(id).select(
    "_id title slug excerpt content tags status"
  );

  if (!article) return null;

  return {
    id: article._id?.toString() ?? article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    tags: article.tags || [],
    published: article.status === "published",
  };
}

// Using a new collection name to avoid schema conflicts
export const Article: Model<IArticle> =
  models?.Article || model<IArticle>("Article", ArticleSchema);
export const Project: Model<IProject> =
  models?.Project || model<IProject>("Project", ProjectSchema);
export const Resume: Model<IResume> =
  models?.Resume || model<IResume>("Resume", ResumeSchema);
