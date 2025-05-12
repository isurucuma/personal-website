import { Button } from "@/components/ui/button";
import Link from "next/link";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, featuring product management, shopping cart, and secure payments.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Image Generator",
    description:
      "An AI-powered image generation tool that creates unique artwork based on text descriptions.",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.title} className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
