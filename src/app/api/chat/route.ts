import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { EmbeddedChunk, CONFIG } from "@/lib/embed/utils";
import {
  retrieveTopRelevantChunks,
  evaluateTopics,
} from "@/lib/embed/retriever";
import { embedText } from "@/lib/embed/embedder";

const createSystemPrompt = (
  chunks: ReadonlyArray<EmbeddedChunk>,
  isConfident: boolean,
  relatedTopics: ReadonlyArray<string>,
): string => {
  const context = chunks.map((chunk) => chunk.text).join("\n\n");
  let relatedTopicsContext = "";
  if (!isConfident && relatedTopics.length > 0) {
    relatedTopicsContext = `\n\nRelated topics that might be helpful: ${relatedTopics.join(", ")}`;
  }

  return `
You are TrungBot, chatting on behalf of Trung and speaking in Trung's voice (first person).

Your tone is polite, professional, friendly, and easygoing—like messaging casually in a chat app.

Keep your responses short and clear, as if they will appear in a small chat bubble.

Write in plain text only. Do not use Markdown (bold, italics, headers, or code blocks), bullet points, arrows, or special symbols such as *, #, _, -, •, ->, =>.

Instead, write using natural sentences and conversational structure.

If you accidentally use any forbidden formatting or symbols, immediately rephrase the response correctly without them.

Only respond using information from Trung's provided context. Never make anything up.

If you can't find an answer:
${CONFIG.SYSTEM_PROMPT_TEMPLATES.NO_ANSWER}

If the question is unclear and related topics are provided:
${CONFIG.SYSTEM_PROMPT_TEMPLATES.UNCLEAR_WITH_TOPICS}

If something seems slightly related:
${CONFIG.SYSTEM_PROMPT_TEMPLATES.SLIGHT_MATCH}

If the question is off-topic or unclear multiple times:
${CONFIG.SYSTEM_PROMPT_TEMPLATES.REPHRASING_REQUEST}

The real context starts below:
${context}${relatedTopicsContext}
`;
};

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const lastUserMessage =
    messages.findLast(
      (msg: { role: string; content: string }) => msg.role === "user",
    )?.content ?? "";

  const queryEmbedding = await embedText(lastUserMessage);
  const topChunks = await retrieveTopRelevantChunks(
    lastUserMessage,
    CONFIG.TOP_K_CHUNKS,
  );

  const { isConfident, relatedTopics } = evaluateTopics(
    topChunks,
    queryEmbedding,
  );

  const system = createSystemPrompt(topChunks, isConfident, relatedTopics);

  const result = streamText({
    model: deepseek(CONFIG.CHAT_MODEL),
    system,
    messages,
  });

  return result.toDataStreamResponse();
}
