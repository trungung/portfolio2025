import trungbotVectors from "@/vectors/trungbot-vectors.json";
import { embedText } from "./embedder";
import {
  EmbeddedChunk,
  CONFIG,
  cosineSimilarity,
  extractTopicsFromChunks,
} from "./utils";
import { CoreMessage } from "ai";

const vectors: ReadonlyArray<EmbeddedChunk> = trungbotVectors;

export function scoreChunks(
  chunks: ReadonlyArray<EmbeddedChunk>,
  queryEmbedding: Record<string, number>,
): Array<EmbeddedChunk & { similarity: number }> {
  return chunks.map((chunk) => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));
}

export function sortBySimilarity<T extends { similarity: number }>(
  chunks: ReadonlyArray<T>,
): Array<T> {
  return [...chunks].sort((a, b) => b.similarity - a.similarity);
}

export async function retrieveTopRelevantChunks(
  query: string,
  topK: number = CONFIG.TOP_K_CHUNKS,
): Promise<EmbeddedChunk[]> {
  const queryEmbedding = await embedText(query);
  return sortBySimilarity(scoreChunks(vectors, queryEmbedding)).slice(0, topK);
}

export function isConfidentMatch(
  chunks: ReadonlyArray<EmbeddedChunk>,
  queryEmbedding: Record<string, number>,
  threshold: number = CONFIG.CONFIDENCE_THRESHOLD,
): boolean {
  if (chunks.length === 0) return false;
  const topSimilarity = cosineSimilarity(queryEmbedding, chunks[0].embedding);
  return topSimilarity > threshold;
}

export async function evaluateQueryTopics(
  query: string,
  topChunks: ReadonlyArray<EmbeddedChunk>,
): Promise<{ isConfident: boolean; relatedTopics: string[] }> {
  const queryEmbedding = await embedText(query);
  const chunks = [...topChunks];
  return {
    isConfident: isConfidentMatch(
      chunks,
      queryEmbedding,
      CONFIG.CONFIDENCE_THRESHOLD,
    ),
    relatedTopics: extractTopicsFromChunks(chunks),
  };
}

export function expandQueryWithContext(
  currentQuery: string,
  previousMessages: CoreMessage[],
  contextWindow: number = 3,
): string {
  const recentUserMessages = previousMessages
    .filter((m) => m.role === "user")
    .slice(-contextWindow)
    .map((m) => m.content);

  const isShortQuery = currentQuery.split(/\s+/).length <= 3;

  if (recentUserMessages.length === 0 || currentQuery.length === 0) {
    return currentQuery;
  }

  if (isShortQuery) {
    return `${currentQuery} ${recentUserMessages.join(" ")}`;
  } else {
    const keyTerms = extractKeyTerms(recentUserMessages.join(" "));
    return `${currentQuery} ${keyTerms.join(" ")}`.trim();
  }
}

function extractKeyTerms(text: string): string[] {
  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "but",
    "by",
    "for",
    "if",
    "in",
    "into",
    "is",
    "it",
    "of",
    "on",
    "or",
    "the",
    "to",
    "was",
    "with",
    "you",
    "your",
    "that",
    "this",
    "can",
    "how",
    "what",
    "when",
    "where",
    "who",
    "why",
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word))
    .slice(0, 10);
}

export async function retrieveWithContext(
  currentQuery: string,
  previousMessages: CoreMessage[],
  topK: number = CONFIG.TOP_K_CHUNKS,
): Promise<EmbeddedChunk[]> {
  const expandedQuery = expandQueryWithContext(currentQuery, previousMessages);
  return retrieveTopRelevantChunks(expandedQuery, topK);
}
