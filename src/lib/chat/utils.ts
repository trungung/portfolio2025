import { z } from "zod";
import { Message } from "ai";

export const LanguageModelUsageSchema = z.object({
  promptTokens: z.number().default(0),
  completionTokens: z.number().default(0),
  totalTokens: z.number().default(0),
});

export const MessageAnnotationSchema = z.object({
  usage: LanguageModelUsageSchema.optional(),
});

export type LanguageModelUsage = z.infer<typeof LanguageModelUsageSchema>;
export type MessageAnnotation = z.infer<typeof MessageAnnotationSchema>;

export function parseMessageUsage(
  message: Message,
): LanguageModelUsage | undefined {
  if (!Array.isArray(message.annotations) || message.annotations.length === 0) {
    return undefined;
  }

  try {
    const result = MessageAnnotationSchema.safeParse(message.annotations[0]);
    return result.success ? result.data.usage : undefined;
  } catch (error) {
    console.warn("Failed to parse message annotation:", error);
    return undefined;
  }
}
