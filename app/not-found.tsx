"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Newspaper, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-bold text-neutral-900 mt-4">
            Page Not Found
          </h2>
          <p className="text-neutral-600 mt-2">
            Sorry, we couldn&#39;t find the page you&#39;re looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Back Home
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <Newspaper className="h-4 w-4 mr-2" />
              Browse News
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/search">
              <Search className="h-4 w-4 mr-2" />
              Search Articles
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
