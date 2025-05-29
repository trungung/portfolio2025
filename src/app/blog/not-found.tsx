import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-200px)] flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground mt-4 mb-6 text-xl">
        Blog post not found
      </p>
      <Button asChild>
        <Link href="/blog">Back to Blogs</Link>
      </Button>
    </div>
  );
}
