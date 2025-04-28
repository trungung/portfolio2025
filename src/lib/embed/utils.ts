import fs from "fs/promises";

export type EmbeddedChunk = {
  id: string;
  text: string;
  embedding: Record<string, number>;
  source: string;
};

export function chunkText(text: string, chunkSize = 300): string[] {
  const words: string[] = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}

export async function ensureFolderExists(folderPath: string): Promise<void> {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (error) {
    console.error("❌ Error creating folder:", error);
  }
}
