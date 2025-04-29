import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { chunkText, EmbeddedChunk, ensureFolderExists, CONFIG } from "./utils";
import { embedText } from "./embedder";
import removeMarkdown from "remove-markdown";

const DATA_FOLDER = CONFIG.DATA_FOLDER;
const OUTPUT_FILE = CONFIG.VECTORS_FILE;

async function main(): Promise<void> {
  try {
    const files = await fs.readdir(DATA_FOLDER);
    const validFiles = files.filter((file) =>
      [".txt", ".md", ".mdx"].some((ext) => file.endsWith(ext)),
    );

    if (validFiles.length === 0) {
      console.log("⚠️ No valid input files found in /data/");
      return;
    }

    const allChunks: EmbeddedChunk[] = [];

    for (const fileName of validFiles) {
      const filePath = path.join(DATA_FOLDER, fileName);
      console.log(`📄 Processing file: ${fileName}`);

      const fileContent = await fs.readFile(filePath, "utf-8");

      let text: string;
      let title: string;
      let category: string;

      if (fileName.endsWith(".mdx") || fileName.endsWith(".md")) {
        const { data, content } = matter(fileContent);
        text = removeMarkdown(content);
        title = data.title ?? fileName;

        category =
          (data.category ??
          (fileName.endsWith(".md") || fileName.endsWith(".mdx")))
            ? "project"
            : fileName.includes("cv")
              ? "cv"
              : fileName.includes("faq")
                ? "faq"
                : "general";
      } else {
        text = fileContent;
        title = fileName;
        category = fileName.includes("cv")
          ? "cv"
          : fileName.includes("faq")
            ? "faq"
            : "general";
      }

      const chunks = chunkText(text, CONFIG.CHUNK_SIZE);

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await embedText(chunk);
        console.log(
          `✅ Embedded chunk ${i + 1}/${chunks.length} from ${fileName}`,
        );

        allChunks.push({
          id: `${fileName}_chunk_${i}`,
          text: chunk,
          embedding,
          source: fileName,
          category,
          title,
        });
      }
    }

    if (allChunks.length > 0) {
      await ensureFolderExists(path.dirname(OUTPUT_FILE));
      await fs.writeFile(
        OUTPUT_FILE,
        JSON.stringify(allChunks, null, 2),
        "utf-8",
      );
      console.log(`✅ Saved ${allChunks.length} vectors to ${OUTPUT_FILE}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();
