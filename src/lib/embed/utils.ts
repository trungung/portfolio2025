import fs from "fs/promises";

export const CONFIG = {
  CHUNK_SIZE: 150,
  DATA_FOLDER: "./data",
  VECTORS_FILE: "./src/vectors/trungbot-vectors.json",
  TOP_K_CHUNKS: 10,
  CONFIDENCE_THRESHOLD: 0.7,
  CHAT_MODEL: "deepseek-chat",
  SYSTEM_PROMPT_TEMPLATES: {
    NO_ANSWER:
      "I couldn't find details on that in Trung's documents. Want to try asking it another way?",
    UNCLEAR_WITH_TOPICS:
      "I'm not sure what exactly you're looking for. Would you like to learn about any of these related topics: [topics]?",
    SLIGHT_MATCH:
      "This might be related: [summary]. Let me know if you'd like more info.",
    REPHRASING_REQUEST:
      "I'm having a bit of trouble understanding. Could you try rephrasing your question?",
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

export const chunkText = (
  text: string,
  chunkSize = CONFIG.CHUNK_SIZE,
): ReadonlyArray<string> => {
  const words = text.split(/\s+/);

  return Array.from({ length: Math.ceil(words.length / chunkSize) }, (_, i) =>
    words.slice(i * chunkSize, (i + 1) * chunkSize).join(" "),
  );
};

export const ensureFolderExists = async (folderPath: string): Promise<void> => {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (error) {
    console.error("❌ Error creating folder:", error);
  }
};
