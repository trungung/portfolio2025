import fs from "fs/promises";
import path from "path";
import { chunkText, EmbeddedChunk, ensureFolderExists } from "./utils";
import { embedText } from "./embedder";

export const dataFolderPath = "./data";
export const outputFilePath = "./src/vectors/trungbot-vectors.json";

async function listValidFiles(folderPath: string): Promise<string[]> {
  const files = await fs.readdir(folderPath);
  return files.filter(
    (file) =>
      file.endsWith(".txt") || file.endsWith(".md") || file.endsWith(".mdx"),
  );
}

async function processFile(
  filePath: string,
  fileName: string,
): Promise<EmbeddedChunk[]> {
  const text = await fs.readFile(filePath, "utf-8");
  const chunks = chunkText(text, 300);

  const embeddedChunks: EmbeddedChunk[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embedText(chunks[i]);
    embeddedChunks.push({
      id: `${fileName}_chunk_${i}`,
      text: chunks[i],
      embedding,
      source: fileName,
    });
    console.log(`✅ Embedded chunk ${i + 1}/${chunks.length} from ${fileName}`);
  }

  return embeddedChunks;
}

async function processAllFiles(folderPath: string): Promise<EmbeddedChunk[]> {
  const fileNames = await listValidFiles(folderPath);

  if (fileNames.length === 0) {
    console.log("⚠️ No valid input files found in /data/");
    return [];
  }

  const allChunks: EmbeddedChunk[] = [];

  for (const fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);
    console.log(`📄 Processing file: ${fileName}`);
    const chunks = await processFile(filePath, fileName);
    allChunks.push(...chunks);
  }

  return allChunks;
}

async function saveVectors(
  vectors: EmbeddedChunk[],
  outputPath: string,
): Promise<void> {
  await ensureFolderExists(path.dirname(outputPath));
  await fs.writeFile(outputPath, JSON.stringify(vectors, null, 2), "utf-8");
  console.log(`✅ Saved all vectors to ${outputPath}`);
}

async function main() {
  try {
    const vectors = await processAllFiles(dataFolderPath);
    if (vectors.length > 0) {
      await saveVectors(vectors, outputFilePath);
    }
  } catch (error) {
    console.error("❌ Error processing files:", error);
  }
}

main();
