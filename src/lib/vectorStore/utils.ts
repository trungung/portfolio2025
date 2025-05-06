import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { Parent, RootContent, Root } from "mdast";
import { UpstashDocument } from "./type";

export const CONFIG = {
  MAX_CHARS: 500,
  EMBEDDING_MODEL: "Xenova/all-MiniLM-L6-v2",
  K: 8,
  DATA_DIR: "./data",
  OUTPUT_DIR: "./src/vector_index",
};

function toText(node: RootContent | Parent): string {
  if ("value" in node) return node.value as string;
  if ("children" in node)
    return (node.children as (RootContent | Parent)[]).map(toText).join("\n");
  return "";
}

export function chunkMarkdown(rawMd: string, file: string) {
  const { content, data: meta } = matter(rawMd);
  const root = unified().use(remarkParse).parse(content) as Root;

  const chunks: UpstashDocument[] = [];
  let headings: string[] = [];
  let buf: string[] = [];
  let idx = 0;

  const flush = () => {
    if (!buf.length) return;

    const headingTrail = headings.filter(Boolean).join(" › ");
    const prefixLines = [
      `Source: ${file}`,
      headingTrail && `Section: ${headingTrail}`,
    ].filter(Boolean);

    const pageContent = prefixLines.join("\n") + "\n\n" + buf.join("\n").trim();

    chunks.push({
      id: `${file}-${idx}`,
      data: pageContent,
      metadata: {
        source: file,
        chunkIndex: idx++,
        headings,
        ...meta,
      },
    });
    buf = [];
  };

  root.children.forEach((node) => {
    if (node.type === "heading") {
      flush();
      const depth = node.depth!;
      headings = headings.slice(0, depth - 1);
      headings[depth - 1] = toText(node).replace(/\n+/g, " ").trim();
    } else {
      const text = toText(node);
      text.split(/\n{2,}/).forEach((para) => {
        if (!para.trim()) return;
        if (buf.join("\n").length + para.length > CONFIG.MAX_CHARS) flush();
        buf.push(para);
      });
    }
  });
  flush();
  return chunks;
}
