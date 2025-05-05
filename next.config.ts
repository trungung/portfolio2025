// next.config.ts
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX({
  // Other Next.js config options
  serverExternalPackages: ["hnswlib-node"],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
});
