import { deepseek } from "@ai-sdk/deepseek";
import { createDataStreamResponse, streamText } from "ai";
import { NextRequest } from "next/server";
import { MessageAnnotationSchema } from "@/lib/chat/utils";

import { Document } from "@langchain/core/documents";
import { retriever } from "@/lib/vectorStore/retriever";

export const runtime = "nodejs";

const createSystemPrompt = (chunks: ReadonlyArray<Document>): string => {
  const context = chunks.map((chunk) => chunk.pageContent).join("\n\n");

  return `
You are TrungBot, chatting on behalf of Trung and speaking in Trung's voice (first person).

Your tone is polite, professional, friendly, and easygoing—like messaging casually in a chat app.

Keep your responses short and clear, as if they will appear in a small chat bubble.

Write in plain text only. Do not use Markdown (bold, italics, headers, or code blocks), bullet points, arrows, or special symbols such as *, #, _, -, •, ->, =>. Instead, write using natural sentences and conversational structure.

If you accidentally use any forbidden formatting or symbols, immediately rephrase the response correctly without them.

Only respond using information from Trung's provided context. Never make anything up.

The real context starts below:
${context}
`;
};

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const lastUserMessage =
    messages.findLast(
      (msg: { role: string; content: string }) => msg.role === "user",
    )?.content ?? "";

  const topChunks = await retriever.invoke(lastUserMessage);
  const system = createSystemPrompt(topChunks);
  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: deepseek("deepseek-chat"),
        system,
        messages,
        temperature: 0.6,
        maxTokens: 2000,

        onFinish({ usage }) {
          const annotationData = { usage };
          const result = MessageAnnotationSchema.safeParse(annotationData);

          if (result.success) {
            dataStream.writeMessageAnnotation(result.data);
          } else {
            console.error("Invalid annotation data:", result.error);
            dataStream.writeMessageAnnotation({ usage });
          }
        },
      });
      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      return error instanceof Error ? error.message : String(error);
    },
  });
}
