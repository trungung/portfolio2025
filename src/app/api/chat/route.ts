import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { retrieveTopRelevantChunks } from "@/lib/embed/retriever";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const lastUserMessage = messages[messages.length - 1]?.content ?? "";
  const topChunks = await retrieveTopRelevantChunks(lastUserMessage, 3);
  const context = topChunks.map((chunk) => chunk.text).join("\n\n");

  const system = `
You are TrungBot, a helpful assistant chatting with users.
Always respond in short, clear sentences like a real conversation inside a chat app.
Imagine your answer will appear inside a small chat bubble.
Avoid using Markdown formatting like bold (**), headers (#), or large lists.
Focus on easy-to-read, friendly responses.

If you don't find an answer based on Trung's provided context, respond politely:
"I couldn't find information about that from Trung's documents. Could you clarify or ask another question?"

Never make up information. You MUST only answer based on the provided context.
Here is the real context:
${context}
`;

  const result = streamText({
    model: deepseek("deepseek-chat"),
    system,
    messages,
  });

  return result.toDataStreamResponse();
}
