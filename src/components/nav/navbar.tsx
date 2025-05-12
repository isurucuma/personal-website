"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/resume",
    label: "Resume",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/blog",
    label: "Blog",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="block px-2 py-1 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="ml-4 flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl">
            Portfolio
          </Link>
        </div>
        <div className="hidden md:flex ml-auto items-center space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
