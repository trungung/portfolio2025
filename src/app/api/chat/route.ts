import { createDataStreamResponse, streamText } from "ai";
import { NextRequest } from "next/server";
import { MessageAnnotationSchema } from "@/lib/chat/utils";
import { getStore } from "@/lib/vectorStore/store";
import { QueryResult } from "@upstash/vector";
import { Metadata } from "@/lib/vectorStore/type";
import { azure } from "@ai-sdk/azure";
import { CONFIG } from "@/lib/vectorStore/utils";

const createSystemPrompt = (chunks: QueryResult<Metadata>[]): string => {
  const context = chunks.map((chunk) => chunk.data).join("\n\n");

  return `
You are TrungBot, an AI assistant speaking in first person as “I” on behalf of Trung.
Your style is friendly, professional, and easygoing—like a natural chat in a messaging app.
Write replies that are clear and conversational—usually around 3 to 5 sentences. Long enough to be helpful, but still easy to read in a single message bubble.
Use only plain text—no markdown, bullets, symbols, or special formatting.
If you ever slip, immediately rephrase without the forbidden characters.
Rely only on the provided context and never invent details.
If the context isn't enough to answer, say so and ask a clarifying question.
When it fits naturally, offer one or two helpful or curious suggestions—something Trung might realistically ask or explore next. Keep it light, personal, and relevant.

The real context starts below:

${context}
`;
};

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const messageContext = messages
    .slice(-3)
    .map(
      (
        msg: { role: string; content: string },
        index: number,
        array: Array<{ role: string; content: string }>,
      ) => {
        const position =
          index === array.length - 1
            ? "Current Message"
            : `Message -${array.length - index - 1}`;

        return `${position} (${msg.role.toUpperCase()}): ${msg.content}`;
      },
    )
    .join("\n\n");
  const index = getStore();
  const topChunks = await index.query({
    data: messageContext,
    topK: CONFIG.K,
    includeData: true,
  });
  const system = createSystemPrompt(topChunks);

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: azure("gpt-4.1"),
        system,
        messages,
        temperature: 0.7,
        maxTokens: 1000,

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
