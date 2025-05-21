import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <h1 className="text-4xl font-bold text-center">
        Welcome to My Portfolio
      </h1>
      <p className="text-xl text-center text-muted-foreground max-w-[600px]">
        I&apos;m a passionate developer creating innovative solutions. Explore
        my work, read my blog posts, and learn more about my journey in tech.
      </p>
      <div className="relative w-[600px] h-[300px] rounded-lg overflow-hidden">
        <Image
          src="/uploads/portfolio-thumbnail.jpg"
          alt="Portfolio Preview"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/projects">View Projects</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/resume">View Resume</Link>
        </Button>
      </div>
    </div>
  );
}
