import { unified } from "unified";
import remarkParse from "remark-parse";
import { Parent, RootContent, Root } from "mdast";
import { UpstashDocument } from "./type";
import { ProjectMetaSchema } from "../projects";
import { z } from "zod";

export const CONFIG = {
  MAX_CHARS: 500,
  K: 8,
  DATA_DIR: "src/content",
};

function toText(node: RootContent | Parent): string {
  if ("value" in node) return node.value as string;
  if ("children" in node)
    return (node.children as (RootContent | Parent)[]).map(toText).join("\n");
  return "";
}

function extractMetadata(content: string): {
  projectMeta: z.infer<typeof ProjectMetaSchema> | null;
  cleanedContent: string;
} {
  const exportRegex = /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};/;
  const match = content.match(exportRegex);

  if (!match) {
    return { projectMeta: null, cleanedContent: content };
  }

  try {
    // Extract just the object part without the export statement or semicolon
    const objectPart = match[1].trim();
    const metadataObj = new Function(`return {${objectPart}}`)();

    const metadata = metadataObj;

    try {
      const validatedMetadata = ProjectMetaSchema.parse(metadata);
      return {
        projectMeta: validatedMetadata,
        cleanedContent: content.replace(exportRegex, ""),
      };
    } catch (zodError) {
      console.warn("Metadata validation failed:", zodError);
      return {
        projectMeta: metadata,
        cleanedContent: content.replace(exportRegex, ""),
      };
    }
  } catch (error) {
    console.error("Error parsing metadata:", error);
    return {
      projectMeta: null,
      cleanedContent: content.replace(exportRegex, ""),
    };
  }
}

export function chunkMarkdown(
  rawMdContent: string,
  meta: Record<string, unknown>,
  file: string,
) {
  const { projectMeta, cleanedContent } = extractMetadata(rawMdContent);
  const root = unified().use(remarkParse).parse(cleanedContent) as Root;

  const chunks: UpstashDocument[] = [];

  if (projectMeta && (file.endsWith(".mdx") || file.includes("projects"))) {
    let metadataText = `Source: ${file}`;
    if (projectMeta.title) {
      metadataText += `\n\nProject: ${projectMeta.title}`;
    }
    if (projectMeta.duration) {
      metadataText += `\n\nDuration: ${projectMeta.duration}`;
    }
    if (projectMeta.stacks && projectMeta.stacks.length > 0) {
      metadataText += `\n\nTechnologies: ${projectMeta.stacks.join(", ")}`;
    }
    if (projectMeta.cardDescription) {
      metadataText += `\n\nDescription: ${projectMeta.cardDescription}`;
    }
    if (projectMeta.quickSummary) {
      metadataText += `\n\nSummary: ${projectMeta.quickSummary}`;
    }

    if (metadataText.trim()) {
      chunks.push({
        id: `${file}-metadata`,
        data: metadataText.trim(),
        metadata: {
          source: file,
          chunkIndex: -1,
          headings: [],
          type: "project-metadata",
          ...meta,
        },
      });
    }
  }
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
