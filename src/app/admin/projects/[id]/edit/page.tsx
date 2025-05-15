"use client";

import {
  ProjectForm,
  ProjectFormData,
} from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: Props) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = params instanceof Promise ? await params : params;
      setProjectId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const fetchProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async (formData: ProjectFormData) => {
    if (!projectId) return;
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <Link href="/admin/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <Button asChild variant="outline">
          <Link href="/admin/projects">Cancel</Link>
        </Button>
      </div>

      <ProjectForm
        initialData={project}
        onSubmit={handleUpdateProject}
        isSubmitting={false}
      />
    </div>
  );
}
