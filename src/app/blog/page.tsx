import Link from "next/link";
import { getBlogList } from "@/lib/blogs";
import Image from "next/image";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const blogs = await getBlogList();
  const selectedTag = (await searchParams)?.tag || null;

  const filteredBlogs = selectedTag
    ? blogs.filter((blog) =>
        blog.meta.tags
          .map((t) => t.toLowerCase())
          .includes(selectedTag.toLowerCase()),
      )
    : blogs;

  return (
    <main className="mx-auto w-full max-w-prose font-mono">
      <div className="mt-20 mb-14">
        <h1 className="text-4xl font-bold">My Writings</h1>
        <div className="mt-4">
          <p className="text-muted-foreground">
            This space is where I document my personal experiences, ideas, and
            the lessons I learn along the way.
          </p>
        </div>
      </div>

      <div className="divide-line mb-16 divide-y">
        {filteredBlogs.map((blog) => {
          const date = new Date(blog.meta.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.slug}
              aria-label={blog.meta.title}
              className="group grid grid-cols-1 grid-rows-1 gap-6 py-5 sm:grid-cols-[3fr_1fr]"
            >
              <div>
                <h2 className="mb-3 flex items-start gap-1">
                  <span className="text-xl leading-tight font-bold tracking-tight sm:text-2xl">
                    {blog.meta.title}
                  </span>
                </h2>
                {blog.meta.description && (
                  <p className="text-muted-foreground group-hover:text-foreground line-clamp-3 text-sm">
                    <span>{blog.meta.description}</span>
                  </p>
                )}
                <div className="text-muted-foreground group-hover:text-foreground mt-2.5 text-xs">
                  {formattedDate}
                </div>
              </div>
              <div className="flex h-full w-full">
                <div className="block size-24 h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={blog.meta.coverImage}
                    alt={blog.meta.title}
                    width={200}
                    height={200}
                    className="h-full w-full rounded-xl object-cover transition-all duration-700 ease-out group-hover:scale-105 sm:size-36"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
