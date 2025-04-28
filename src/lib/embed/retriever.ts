import trungbotVectors from "@/vectors/trungbot-vectors.json";

import { embedText } from "./embedder";
import { EmbeddedChunk } from "./utils";

const vectors: EmbeddedChunk[] = trungbotVectors;

function cosineSimilarity(
  a: Record<string, number>,
  b: Record<string, number>,
): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  // Assuming both objects have the same keys
  for (const key in a) {
    if (b[key] !== undefined) {
      dot += a[key] * b[key];
      normA += a[key] * a[key];
      normB += b[key] * b[key];
    }
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieveTopRelevantChunks(
  query: string,
  topK: number = 3,
): Promise<EmbeddedChunk[]> {
  const queryEmbedding = await embedText(query);

  const scored = vectors.map((chunk) => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, topK);
}
