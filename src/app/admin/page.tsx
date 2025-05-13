"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Temporary Stats Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Total Article Views</h3>
          <p className="text-3xl font-bold">Coming Soon</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Project Interactions</h3>
          <p className="text-3xl font-bold">Coming Soon</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Total Visitors</h3>
          <p className="text-3xl font-bold">Coming Soon</p>
        </div>
      </div>

      {/* Content Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/articles" className="block">
          <div className="p-6 border rounded-lg bg-card hover:bg-secondary/50 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
            <p className="text-muted-foreground">
              Create, edit, and manage your blog articles
            </p>
          </div>
        </Link>
        <Link href="/admin/projects" className="block">
          <div className="p-6 border rounded-lg bg-card hover:bg-secondary/50 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Manage Projects</h2>
            <p className="text-muted-foreground">
              Showcase and update your portfolio projects
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
