import fs from "fs/promises";

export const CONFIG = {
  CHUNK_SIZE: 150,
  CHUNK_OVERLAP: 0.5,
  DATA_FOLDER: "./data",
  VECTORS_FILE: "./src/vectors/trungbot-vectors.json",
  SUPPORTED_EXTENSIONS: [".txt", ".md", ".mdx"],
  TOP_K_CHUNKS: 5,
  CONFIDENCE_THRESHOLD: 0.83,
  CHAT_MODEL: "deepseek-chat",
  SYSTEM_PROMPT_TEMPLATES: {
    NO_ANSWER:
      "I couldn't find anything about that in Trung's documents, so I'd rather not guess. Feel free to ask something else.",
    UNCLEAR_WITH_TOPICS:
      "I'm not totally sure what you mean, but here are a few things I can talk about: [topics]. Want to check one of those out?",
    SLIGHT_MATCH:
      "This isn't a perfect match, but it might be loosely related: [summary]. If it's not what you meant, just point me in the right direction.",
    REPHRASING_REQUEST:
      "I didn't quite catch that. Mind rephrasing the question or giving me a bit more detail?",
  },
};

export type EmbeddedChunk = Readonly<{
  id: string;
  text: string;
  embedding: Record<string, number>;
  source: string;
  category?: string;
  title?: string;
}>;

export function cosineSimilarity(
  vec1: Record<string, number>,
  vec2: Record<string, number>,
): number {
  const keys = Object.keys(vec1).filter((key) => key in vec2);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const key of keys) {
    dotProduct += vec1[key] * vec2[key];
    normA += Math.pow(vec1[key], 2);
    normB += Math.pow(vec2[key], 2);
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function chunkTextWithOverlap(
  text: string,
  chunkSize = CONFIG.CHUNK_SIZE,
  overlapPercentage = CONFIG.CHUNK_OVERLAP,
): ReadonlyArray<string> {
  const words = text.split(/\s+/);
  const overlap = Math.floor(chunkSize * overlapPercentage);
  const stride = chunkSize - overlap;

  if (words.length <= chunkSize) return [words.join(" ")];

  const chunks: string[] = [];
  for (let i = 0; i < words.length - overlap; i += stride) {
    const chunk = words
      .slice(i, Math.min(i + chunkSize, words.length))
      .join(" ");
    chunks.push(chunk);
  }

  return chunks;
}

export function extractTopicsFromChunks(chunks: EmbeddedChunk[]): string[] {
  const topics = new Set<string>();

  chunks.forEach((chunk) => {
    if (chunk.category) topics.add(chunk.category);
    if (chunk.title) topics.add(chunk.title);
  });

  return Array.from(topics);
}

export async function ensureFolderExists(folderPath: string): Promise<void> {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (error) {
    console.error("❌ Error creating folder:", error);
  }
}
