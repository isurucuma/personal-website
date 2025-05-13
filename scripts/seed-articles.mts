import mongoose from "mongoose";
import { Article } from "../src/lib/models.js";
import dotenv from "dotenv";

// Load environment variables from .env.development
dotenv.config({ path: ".env.development" });

const articles = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-with-nextjs-14",
    excerpt:
      "Learn how to build modern web applications with Next.js 14's latest features including Server Components and App Router.",
    content: `
      <h2>Introduction to Next.js 14</h2>
      <p>Next.js 14 brings revolutionary changes to web development, making it easier than ever to build fast, scalable applications.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Server Components</li>
        <li>Improved App Router</li>
        <li>Turbopack (Beta)</li>
        <li>Server Actions</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js 14 project, run the following command:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <p>This will set up a new project with all the latest features enabled.</p>
    `,
    tags: ["Next.js", "React", "Web Development"],
    status: "published",
    createdAt: new Date("2024-01-15"),
  },
  {
    title: "Understanding TypeScript's Advanced Types",
    slug: "understanding-typescript-advanced-types",
    excerpt:
      "Deep dive into TypeScript's advanced type system features including mapped types, conditional types, and utility types.",
    content: `
      <h2>Advanced TypeScript Types</h2>
      <p>TypeScript's type system is one of its most powerful features, offering advanced capabilities for type safety.</p>
      
      <h3>Mapped Types</h3>
      <pre><code>type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}</code></pre>
      
      <h3>Conditional Types</h3>
      <pre><code>type ExtractType<T> = T extends string 
  ? 'string' 
  : T extends number 
    ? 'number' 
    : 'other';</code></pre>
      
      <p>These advanced types help create more maintainable and type-safe code.</p>
    `,
    tags: ["TypeScript", "Programming", "JavaScript"],
    status: "published",
    createdAt: new Date("2024-02-01"),
  },
  {
    title: "Building RESTful APIs with Node.js and Express",
    slug: "building-restful-apis-nodejs-express",
    excerpt:
      "Learn how to create scalable and maintainable RESTful APIs using Node.js and Express framework.",
    content: `
      <h2>RESTful API Design</h2>
      <p>Building a well-designed REST API is crucial for modern web applications.</p>
      
      <h3>Basic Express Setup</h3>
      <pre><code>const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  // Handle GET request
});</code></pre>
      
      <h3>Middleware</h3>
      <p>Express middleware functions are a powerful way to handle common tasks:</p>
      <ul>
        <li>Authentication</li>
        <li>Logging</li>
        <li>Error Handling</li>
      </ul>
    `,
    tags: ["Node.js", "Express", "API", "Backend"],
    status: "published",
    createdAt: new Date("2024-02-15"),
  },
  {
    title: "Mastering CSS Grid Layout",
    slug: "mastering-css-grid-layout",
    excerpt:
      "A comprehensive guide to using CSS Grid Layout for creating complex web layouts with ease.",
    content: `
      <h2>CSS Grid Fundamentals</h2>
      <p>CSS Grid Layout is a powerful system for creating two-dimensional layouts.</p>
      
      <h3>Basic Grid Setup</h3>
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
      
      <h3>Grid Areas</h3>
      <p>Grid areas allow you to create named template areas:</p>
      <pre><code>.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}</code></pre>
    `,
    tags: ["CSS", "Web Design", "Frontend"],
    status: "published",
    createdAt: new Date("2024-03-01"),
  },
  {
    title: "React Performance Optimization Techniques",
    slug: "react-performance-optimization",
    excerpt:
      "Learn advanced techniques for optimizing React applications for better performance.",
    content: `
      <h2>React Performance</h2>
      <p>Optimizing React applications is crucial for providing a smooth user experience.</p>
      
      <h3>Memoization</h3>
      <pre><code>const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});</code></pre>
      
      <h3>Code Splitting</h3>
      <p>Use dynamic imports to split your code:</p>
      <pre><code>const MyComponent = React.lazy(() => 
  import('./MyComponent')
);</code></pre>
    `,
    tags: ["React", "Performance", "JavaScript"],
    status: "draft",
    createdAt: new Date("2024-03-15"),
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("Connected to MongoDB");

    // Clear existing articles
    await Article.deleteMany({});
    console.log("Cleared existing articles");

    // Insert new articles
    await Article.insertMany(articles);
    console.log("Inserted new articles");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
