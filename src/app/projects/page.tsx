import { IProject } from "@/lib/models";
import Image from "next/image";

interface ProjectWithId extends IProject {
  _id: string;
}

async function getProjects() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?status=published`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return data.projects as ProjectWithId[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>

      {/* Featured Projects */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <div
                key={project._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.sourceUrls?.github && (
                      <a
                        href={project.sourceUrls.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Other Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <div
                key={project._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.languages
                        .concat(project.technologies.frameworks)
                        .slice(0, 3)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-secondary rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.sourceUrls?.github && (
                      <a
                        href={project.sourceUrls.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
