import trungbotVectors from "@/vectors/trungbot-vectors.json";
import { embedText } from "./embedder";
import { EmbeddedChunk, CONFIG } from "./utils";

const vectors: ReadonlyArray<EmbeddedChunk> = trungbotVectors;

export const cosineSimilarity = (
  a: Record<string, number>,
  b: Record<string, number>,
): number => {
  const keys = Object.keys(a).filter((key) => b[key] !== undefined);

  const dot = keys.reduce((sum, key) => sum + a[key] * b[key], 0);

  const normA = Math.sqrt(keys.reduce((sum, key) => sum + a[key] * a[key], 0));
  const normB = Math.sqrt(keys.reduce((sum, key) => sum + b[key] * b[key], 0));

  return normA > 0 && normB > 0 ? dot / (normA * normB) : 0;
};

export const scoreChunks = (
  chunks: ReadonlyArray<EmbeddedChunk>,
  queryEmbedding: Record<string, number>,
): Array<EmbeddedChunk & { similarity: number }> => {
  return chunks.map((chunk) => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));
};

export const sortBySimilarity = <T extends { similarity: number }>(
  chunks: ReadonlyArray<T>,
): Array<T> => {
  return [...chunks].sort((a, b) => b.similarity - a.similarity);
};

export async function retrieveTopRelevantChunks(
  query: string,
  topK: number = CONFIG.TOP_K_CHUNKS,
): Promise<EmbeddedChunk[]> {
  const queryEmbedding = await embedText(query);

  return sortBySimilarity(scoreChunks(vectors, queryEmbedding)).slice(0, topK);
}

export const extractUniqueTopics = (
  chunks: ReadonlyArray<EmbeddedChunk>,
): string[] => {
  return Array.from(
    new Set(
      chunks
        .map((chunk) => chunk.title || chunk.source)
        .filter(Boolean) as string[],
    ),
  );
};

export const isConfidentMatch = (
  chunks: ReadonlyArray<EmbeddedChunk>,
  queryEmbedding: Record<string, number>,
  threshold: number,
): boolean => {
  if (chunks.length === 0) return false;

  const topSimilarity = cosineSimilarity(queryEmbedding, chunks[0].embedding);
  return topSimilarity > threshold;
};

export function evaluateTopics(
  topChunks: ReadonlyArray<EmbeddedChunk>,
  queryEmbedding: Record<string, number>,
  confidenceThreshold: number = CONFIG.CONFIDENCE_THRESHOLD,
): { isConfident: boolean; relatedTopics: string[] } {
  return {
    isConfident: isConfidentMatch(
      topChunks,
      queryEmbedding,
      confidenceThreshold,
    ),
    relatedTopics: extractUniqueTopics(topChunks),
  };
}
