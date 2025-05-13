import mongoose from "mongoose";
import { Project } from "../src/lib/models.js";
import dotenv from "dotenv";

// Load environment variables from .env.development
dotenv.config({ path: ".env.development" });

const projects = [
  {
    title: "Personal Portfolio Website",
    slug: "personal-portfolio-website",
    description: "A modern portfolio and blog platform built with Next.js 14",
    longDescription: `A full-featured portfolio website showcasing my projects and technical writing. 
    Built with Next.js 14 App Router and MongoDB, featuring a custom CMS for managing content,
    Server Components for optimal performance, and a modern responsive design.`,
    thumbnail: "/portfolio-thumbnail.jpg",
    demoUrl: "https://portfolio.example.com",
    sourceUrls: {
      github: "https://github.com/username/portfolio-next",
    },
    technologies: {
      languages: ["TypeScript", "JavaScript"],
      frameworks: ["Next.js", "React", "Tailwind CSS"],
      databases: ["MongoDB"],
      tools: ["Git", "VS Code", "Vercel"],
    },
    features: [
      "Server Components and App Router",
      "Custom CMS dashboard",
      "Blog system with MDX support",
      "Project showcase",
      "Responsive design",
      "Dark/Light mode",
    ],
    status: "published",
    featured: true,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-15"),
  },
  {
    title: "AI Code Assistant",
    slug: "ai-code-assistant",
    description: "An AI-powered coding assistant VS Code extension",
    longDescription: `A VS Code extension that provides intelligent code suggestions and 
    automated refactoring using OpenAI's GPT-4. Features include code completion, 
    documentation generation, and natural language processing for code transformation.`,
    thumbnail: "/ai-assistant-thumbnail.jpg",
    demoUrl:
      "https://marketplace.visualstudio.com/items?itemName=username.ai-assistant",
    sourceUrls: {
      github: "https://github.com/username/ai-assistant",
    },
    technologies: {
      languages: ["TypeScript"],
      frameworks: ["VS Code Extension API", "OpenAI API"],
      databases: [],
      tools: ["ESBuild", "Jest", "GitHub Actions"],
    },
    features: [
      "Intelligent code completion",
      "Natural language to code conversion",
      "Automated documentation generation",
      "Code refactoring suggestions",
      "Multi-language support",
    ],
    status: "published",
    featured: true,
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-02-28"),
  },
  {
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "A modern e-commerce platform with microservices architecture",
    longDescription: `A scalable e-commerce solution built with microservices architecture. 
    Features include product management, shopping cart functionality, secure payment processing, 
    real-time inventory tracking, and comprehensive order management.`,
    thumbnail: "/ecommerce-thumbnail.jpg",
    demoUrl: "https://shop.example.com",
    sourceUrls: {
      github: "https://github.com/username/ecommerce",
      gitlab: "https://gitlab.com/username/ecommerce",
    },
    technologies: {
      languages: ["TypeScript", "Python", "Go"],
      frameworks: ["Next.js", "FastAPI", "gRPC", "Stripe API"],
      databases: ["PostgreSQL", "Redis", "Elasticsearch"],
      tools: ["Docker", "Kubernetes", "AWS", "Terraform"],
    },
    features: [
      "Microservices architecture",
      "Real-time inventory management",
      "Secure payment processing",
      "Search and filtering",
      "User accounts and profiles",
      "Order tracking system",
    ],
    status: "draft",
    featured: false,
    startDate: new Date("2023-08-01"),
  },
  {
    title: "Weather Analytics Dashboard",
    slug: "weather-analytics-dashboard",
    description: "Real-time weather monitoring and analytics platform",
    longDescription: `A comprehensive weather analytics platform that aggregates data from 
    multiple weather APIs, providing real-time monitoring, historical data analysis, and 
    predictive weather patterns using machine learning.`,
    thumbnail: "/weather-thumbnail.jpg",
    demoUrl: "https://weather.example.com",
    sourceUrls: {
      github: "https://github.com/username/weather-analytics",
    },
    technologies: {
      languages: ["Python", "JavaScript"],
      frameworks: ["FastAPI", "Vue.js", "TensorFlow", "D3.js"],
      databases: ["TimescaleDB", "Redis"],
      tools: ["Docker", "Grafana", "OpenWeatherMap API"],
    },
    features: [
      "Real-time weather tracking",
      "Interactive data visualizations",
      "Machine learning predictions",
      "Historical data analysis",
      "Custom alert system",
      "API integration",
    ],
    status: "published",
    featured: false,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-12-31"),
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("Connected to MongoDB");

    // Clear existing projects
    await Project.deleteMany({});
    console.log("Cleared existing projects");

    // Insert new projects
    await Project.insertMany(projects);
    console.log("Inserted new projects");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
