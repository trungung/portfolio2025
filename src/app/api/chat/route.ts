import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-chat"),
    messages,
  });

  return result.toDataStreamResponse();
}
