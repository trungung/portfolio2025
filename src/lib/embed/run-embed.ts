import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import {
  chunkTextWithOverlap,
  EmbeddedChunk,
  ensureFolderExists,
  CONFIG,
} from "./utils";
import { embedText } from "./embedder";
import removeMarkdown from "remove-markdown";

// Configuration constants
const SUPPORTED_EXTENSIONS = CONFIG.SUPPORTED_EXTENSIONS;
const DATA_FOLDER = CONFIG.DATA_FOLDER;
const OUTPUT_FILE = CONFIG.VECTORS_FILE;

function getContentCategory(
  fileName: string,
  frontmatterCategory?: string,
): string {
  if (frontmatterCategory) return frontmatterCategory;
  if (fileName.endsWith(".md") || fileName.endsWith(".mdx")) return "project";
  if (fileName.includes("cv")) return "cv";
  if (fileName.includes("faq")) return "faq";
  return "general";
}

async function processFile(fileName: string): Promise<EmbeddedChunk[]> {
  console.log(`📄 Processing: ${fileName}`);
  const filePath = path.join(DATA_FOLDER, fileName);
  const fileContent = await fs.readFile(filePath, "utf-8");

  let text = fileContent;
  let title = fileName;
  let category = getContentCategory(fileName);

  if (fileName.endsWith(".md") || fileName.endsWith(".mdx")) {
    const { data, content } = matter(fileContent);
    text = removeMarkdown(content);
    title = data.title ?? fileName;
    category = getContentCategory(fileName, data.category);
  }

  const textChunks = chunkTextWithOverlap(text);
  const results: EmbeddedChunk[] = [];

  for (let i = 0; i < textChunks.length; i++) {
    const chunkText = textChunks[i];
    const embedding = await embedText(chunkText);
    console.log(`✅ Embedded chunk ${i + 1}/${textChunks.length}`);

    results.push({
      id: `${fileName}_chunk_${i}`,
      text: chunkText,
      embedding,
      source: fileName,
      category,
      title,
    });
  }

  return results;
}

async function generateEmbeddings(): Promise<void> {
  try {
    const allFiles = await fs.readdir(DATA_FOLDER);
    const embeddableFiles = allFiles.filter((file) =>
      SUPPORTED_EXTENSIONS.some((ext) => file.endsWith(ext)),
    );

    if (embeddableFiles.length === 0) {
      console.log("⚠️ No supported files found in data directory");
      return;
    }

    const results = await Promise.all(embeddableFiles.map(processFile));
    const allEmbeddings = results.flat();

    if (allEmbeddings.length > 0) {
      await ensureFolderExists(path.dirname(OUTPUT_FILE));
      await fs.writeFile(
        OUTPUT_FILE,
        JSON.stringify(allEmbeddings, null, 2),
        "utf-8",
      );
      console.log(`✅ Saved ${allEmbeddings.length} vectors to ${OUTPUT_FILE}`);
    }
  } catch (error) {
    console.error("❌ Error generating embeddings:", error);
  }
}

generateEmbeddings();
